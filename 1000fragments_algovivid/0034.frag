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
	vec3 col = vec3(0.03, 0.03, 0.02) * clamp(0.55 - p.y * 0.25, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.13); vec2 sf2 = fract(p * 12.13) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.62) * smoothstep(0.05, 0.0, length(sf2)) * step(0.96, sh2) * (0.48 + 0.30 * sin((time * 0.52) * 1.67 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.57 + fa * 0.87 + (time * 0.52) * -0.28;
		float wv = vnoise2(vec2(xx, (time * 0.52) * 0.14 + fa * 7.31));
		float yc = 0.30 + (wv - 0.5) * 0.67;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.12) * exp(-max(dy, 0.0) * 3.72);
		bnd *= 0.70 + 0.33 * sin(xx * 3.24 + (time * 0.52) * 1.91 + fa);
		col += (vec3(0.50) + 0.12 * cos(vec3(0.0, 0.99, 1.98) + fa * 1.22 + (time * 0.52) * 0.68)) * bnd * 0.76;
	}
	col = col / (1.0 + col * 0.89);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 1.001, 0.999) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
