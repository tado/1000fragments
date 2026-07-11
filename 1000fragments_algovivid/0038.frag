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
	p.y = abs(p.y) - 0.55;
	vec3 col = vec3(0.03, 0.04, 0.04) * clamp(0.55 - p.y * 0.38, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.23); vec2 sf2 = fract(p * 6.23) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.61) * smoothstep(0.05, 0.0, length(sf2)) * step(0.94, sh2) * (0.51 + 0.20 * sin((time * 0.57) * 3.57 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.33 + fa * 1.34 + (time * 0.57) * 0.29;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.16 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.57) * 0.48 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.33 + (wv - 0.5) * 1.55;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 24.07);
		col += (vec3(0.44) + 0.27 * cos(vec3(0.0, 1.30, 2.59) + fa * 0.54 + (time * 0.57) * 0.15)) * bnd * 0.99;
	}
	col = col / (1.0 + col * 0.72);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 1.008, 1.013) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
