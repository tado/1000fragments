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
	vec3 col = vec3(0.04, 0.07, 0.05) * clamp(0.70 - p.y * 0.27, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.24); vec2 sf2 = fract(p * 10.24) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.58) * smoothstep(0.04, 0.0, length(sf2)) * step(0.94, sh2) * (0.44 + 0.35 * sin((time * 0.58) * 2.26 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.28 + fa * 0.99 + (time * 0.58) * 0.26;
		float wv = vnoise2(vec2(xx, (time * 0.58) * 0.33 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.58) * 0.48 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.21 + (wv - 0.5) * 0.63;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 8.42);
		bnd *= 0.69 + 0.34 * sin(xx * 4.69 + (time * 0.58) * 1.03 + fa);
		col += (vec3(0.43) + 0.25 * cos(vec3(0.0, 1.05, 2.11) + fa * 0.66 + (time * 0.58) * 0.28)) * bnd * 0.97;
	}
	col = col / (1.0 + col * 0.77);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 1.001, 1.011) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
