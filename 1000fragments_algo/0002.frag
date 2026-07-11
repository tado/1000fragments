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
	vec3 col = vec3(0.06, 0.07, 0.08) * clamp(0.42 - p.y * 0.26, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.06); vec2 sf2 = fract(p * 8.06) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.67) * smoothstep(0.06, 0.0, length(sf2)) * step(0.92, sh2) * (0.60 + 0.27 * sin((time * 0.70) * 2.43 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.92 + fa * 1.69 + (time * 0.70) * -0.19;
		float wv = vnoise2(vec2(xx, (time * 0.70) * 0.22 + fa * 7.31));
		float yc = 0.04 + (wv - 0.5) * 0.75;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.47) * exp(-max(dy, 0.0) * 4.91);
		bnd *= 0.63 + 0.41 * sin(xx * 5.89 + (time * 0.70) * 1.08 + fa);
		col = max(col, (vec3(0.48) + 0.19 * cos(vec3(0.0, 0.75, 1.49) + fa * 0.89 + (time * 0.70) * 0.28)) * bnd * 0.84);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 1.014, 1.008) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
