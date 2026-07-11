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
	vec3 col = vec3(0.03, 0.05, 0.03) * clamp(0.62 - p.y * 0.23, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.65); vec2 sf2 = fract(p * 9.65) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.59) * smoothstep(0.09, 0.0, length(sf2)) * step(0.95, sh2) * (0.46 + 0.24 * sin((time * 0.73) * 3.96 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.64 + fa * 1.79 + (time * 0.73) * -0.12;
		float wv = vnoise2(vec2(xx, (time * 0.73) * 0.11 + fa * 7.31));
		float yc = 0.26 + (wv - 0.5) * 1.56;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.29) * exp(-max(dy, 0.0) * 4.24);
		bnd *= 0.65 + 0.35 * sin(xx * 5.52 + (time * 0.73) * 1.03 + fa);
		col = max(col, (vec3(0.35) + 0.28 * cos(vec3(0.0, 0.75, 1.50) + fa * 0.61 + (time * 0.73) * 0.66)) * bnd * 0.66);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 1.006, 0.951) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
