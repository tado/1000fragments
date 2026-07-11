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
	p += vec2(sin((time * 0.59) * 0.34), cos((time * 0.59) * 0.57)) * 0.12;
	p = p.yx;
	vec3 col = vec3(0.01, 0.03, 0.04) * clamp(0.39 - p.y * 0.32, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.81 + fa * 1.43 + (time * 0.59) * 0.21;
		float wv = vnoise2(vec2(xx, (time * 0.59) * 0.13 + fa * 7.31));
		float yc = -0.33 + (wv - 0.5) * 1.31;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 16.98);
		col = max(col, (vec3(0.49) + 0.28 * cos(vec3(0.0, 0.77, 1.55) + fa * 0.56 + (time * 0.59) * 0.76)) * bnd * 0.76);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.985, 1.008) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
