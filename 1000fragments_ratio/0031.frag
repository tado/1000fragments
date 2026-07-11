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
	p *= 1.38;
	p.y = abs(p.y);
	vec3 col = vec3(0.10, 0.11, 0.11) * clamp(0.46 - p.y * 0.37, 0.0, 1.0);
	vec2 sc2 = floor(p * 11.28); vec2 sf2 = fract(p * 11.28) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.70) * smoothstep(0.07, 0.0, length(sf2)) * step(0.91, sh2) * (0.60 + 0.39 * sin((time * 0.62) * 2.78 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.58 + fa * 0.73 + (time * 0.62) * 0.12;
		float wv = vnoise2(vec2(xx, (time * 0.62) * 0.37 + fa * 7.31));
		float yc = 0.34 + (wv - 0.5) * 0.80;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 26.45);
		col += (vec3(0.35) + 0.23 * cos(vec3(0.0, 1.20, 2.40) + fa * 1.50 + (time * 0.62) * 0.74)) * bnd * 0.67;
	}
	col = col / (1.0 + col * 0.59);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 2.87 + (time * 0.62) * 12.96);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.971, 0.934) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
