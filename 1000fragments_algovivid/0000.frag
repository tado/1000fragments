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
	p.y += sin(p.x * 1.20 + (time * 0.72) * 0.41) * 0.12;
	vec3 col = vec3(0.08, 0.07, 0.06) * clamp(0.31 - p.y * 0.40, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.82); vec2 sf2 = fract(p * 6.82) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.79) * smoothstep(0.09, 0.0, length(sf2)) * step(0.91, sh2) * (0.51 + 0.28 * sin((time * 0.72) * 1.96 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 2.10 + fa * 1.55 + (time * 0.72) * 0.08;
		float wv = vnoise2(vec2(xx, (time * 0.72) * 0.12 + fa * 7.31));
		float yc = -0.04 + (wv - 0.5) * 1.24;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 4.78) * exp(-max(dy, 0.0) * 3.48);
		col += (vec3(0.46) + 0.23 * cos(vec3(0.0, 0.85, 1.70) + fa * 0.88 + (time * 0.72) * 0.66)) * bnd * 1.05;
	}
	col = col / (1.0 + col * 0.68);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 1.000, 0.929) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
