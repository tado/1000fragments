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
	p.y += sin(p.x * 1.11 + (time * 0.61) * 1.31) * 0.17;
	vec3 col = vec3(0.04, 0.03, 0.06) * clamp(0.35 - p.y * 0.50, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.75); vec2 sf2 = fract(p * 10.75) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.78) * smoothstep(0.05, 0.0, length(sf2)) * step(0.93, sh2) * (0.41 + 0.25 * sin((time * 0.61) * 1.85 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.78 + fa * 0.69 + (time * 0.61) * -0.16;
		float wv = vnoise2(vec2(xx, (time * 0.61) * 0.42 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.61) * 0.15 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.19 + (wv - 0.5) * 0.61;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 19.54);
		col = max(col, (vec3(0.49) + 0.28 * cos(vec3(0.0, 0.82, 1.64) + fa * 0.95 + (time * 0.61) * 0.22)) * bnd * 0.67);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.993, 0.987) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
