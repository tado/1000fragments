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
	p.x = abs(p.x) - 0.33;
	p.y = abs(p.y);
	vec3 col = vec3(0.02, 0.06, 0.00) * clamp(0.44 - p.y * 0.42, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.01); vec2 sf2 = fract(p * 9.01) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.72) * smoothstep(0.05, 0.0, length(sf2)) * step(0.94, sh2) * (0.54 + 0.21 * sin((time * 0.51) * 1.83 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.08 + fa * 1.58 + (time * 0.51) * 0.24;
		float wv = vnoise2(vec2(xx, (time * 0.51) * 0.16 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.51) * 0.23 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.10 + (wv - 0.5) * 0.98;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 11.04);
		bnd *= 0.70 + 0.33 * sin(xx * 5.72 + (time * 0.51) * 1.05 + fa);
		col += (vec3(0.49) + 0.26 * cos(vec3(0.0, 0.46, 0.92) + fa * 0.66 + (time * 0.51) * 0.12)) * bnd * 0.79;
	}
	col = col / (1.0 + col * 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.964, 0.993) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
