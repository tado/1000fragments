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
	vec3 col = vec3(0.08, 0.10, 0.09) * clamp(0.35 - p.y * 0.51, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.08 + fa * 1.37 + (time * 0.71) * -0.30;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.23 + fa * 7.31));
		float yc = 0.27 + (wv - 0.5) * 0.83;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 13.07);
		col += (vec3(0.27) + 0.15 * cos(vec3(0.0, 0.90, 1.81) + fa * 0.87 + (time * 0.71) * 0.73)) * bnd * 1.07;
	}
	col = col / (1.0 + col * 0.50);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 0.99 + (time * 0.71) * 15.62);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.012, 0.943) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
