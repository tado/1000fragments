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
	p.x = abs(p.x);
	p.x += p.y * -0.26;
	vec3 col = vec3(0.10, 0.10, 0.08) * clamp(0.61 - p.y * 0.28, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.31); vec2 sf2 = fract(p * 10.31) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.49) * smoothstep(0.08, 0.0, length(sf2)) * step(0.90, sh2) * (0.47 + 0.38 * sin((time * 0.76) * 3.16 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.58 + fa * 1.28 + (time * 0.76) * -0.11;
		float wv = vnoise2(vec2(xx, (time * 0.76) * 0.41 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.76) * 0.59 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.30 + (wv - 0.5) * 1.51;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 19.69);
		col += (vec3(0.29) + 0.21 * cos(vec3(0.0, 0.96, 1.93) + fa * 1.06 + (time * 0.76) * 0.26)) * bnd * 0.67;
	}
	col = col / (1.0 + col * 0.66);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.981, 1.044) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
