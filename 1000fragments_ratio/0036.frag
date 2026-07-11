uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.38;
	vec3 col = vec3(0.01, 0.05, 0.05) * clamp(0.48 - p.y * 0.27, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.25 + fa * 1.41 + (time * 0.81) * -0.11;
		float wv = vnoise2(vec2(xx, (time * 0.81) * 0.32 + fa * 7.31));
		float yc = -0.35 + (wv - 0.5) * 1.47;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.93) * exp(-max(dy, 0.0) * 1.56);
		col += (vec3(0.42) + 0.29 * cos(vec3(0.0, 1.14, 2.27) + fa * 1.32 + (time * 0.81) * 0.37)) * bnd * 0.62;
	}
	col = col / (1.0 + col * 0.55);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.928, 0.996, 1.021) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
