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
	p.x = abs(p.x) - 0.39;
	vec3 col = vec3(0.12, 0.08, 0.07) * clamp(0.68 - p.y * 0.21, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.23); vec2 sf2 = fract(p * 9.23) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.44) * smoothstep(0.05, 0.0, length(sf2)) * step(0.91, sh2) * (0.48 + 0.21 * sin((time * 0.82) * 2.60 + sh2 * 40.0));
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.92 + fa * 0.83 + (time * 0.82) * 0.13;
		float wv = vnoise2(vec2(xx, (time * 0.82) * 0.22 + fa * 7.31));
		float yc = -0.26 + (wv - 0.5) * 1.12;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.37) * exp(-max(dy, 0.0) * 3.53);
		bnd *= 0.65 + 0.31 * sin(xx * 2.39 + (time * 0.82) * 0.93 + fa);
		col = max(col, (vec3(0.44) + 0.12 * cos(vec3(0.0, 0.81, 1.62) + fa * 1.04 + (time * 0.82) * 0.18)) * bnd * 0.84);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 0.980, 0.912) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
