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
	p = p.yx;
	vec3 col = vec3(0.06, 0.05, 0.04) * clamp(0.44 - p.y * 0.25, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.93); vec2 sf2 = fract(p * 10.93) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.49) * smoothstep(0.06, 0.0, length(sf2)) * step(0.93, sh2) * (0.53 + 0.37 * sin((time * 0.64) * 3.14 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 2.04 + fa * 1.92 + (time * 0.64) * 0.19;
		float wv = vnoise2(vec2(xx, (time * 0.64) * 0.46 + fa * 7.31));
		float yc = -0.29 + (wv - 0.5) * 1.40;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 27.93);
		bnd *= 0.68 + 0.30 * sin(xx * 2.25 + (time * 0.64) * 0.95 + fa);
		col += (vec3(0.36) + 0.15 * cos(vec3(0.0, 1.06, 2.11) + fa * 1.60 + (time * 0.64) * 0.43)) * bnd * 0.81;
	}
	col = col / (1.0 + col * 0.88);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.985, 1.058) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
