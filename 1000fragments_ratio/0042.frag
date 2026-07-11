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
	p += vec2(sin((time * 0.54) * 0.83), cos((time * 0.54) * 1.03)) * 0.10;
	vec3 col = vec3(0.04, 0.04, 0.05) * clamp(0.65 - p.y * 0.58, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.48 + fa * 1.84 + (time * 0.54) * 0.29;
		float wv = vnoise2(vec2(xx, (time * 0.54) * 0.46 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.54) * 0.54 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.13 + (wv - 0.5) * 1.04;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.55) * exp(-max(dy, 0.0) * 3.66);
		bnd *= 0.66 + 0.33 * sin(xx * 4.96 + (time * 0.54) * 0.64 + fa);
		col += (vec3(0.30) + 0.20 * cos(vec3(0.0, 0.75, 1.50) + fa * 1.07 + (time * 0.54) * 0.12)) * bnd * 0.87;
	}
	col = col / (1.0 + col * 0.61);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 1.005, 0.951) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
