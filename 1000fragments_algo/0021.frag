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
	p.y = abs(p.y) - 0.25;
	vec3 col = vec3(0.03, 0.04, 0.04) * clamp(0.65 - p.y * 0.49, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.14); vec2 sf2 = fract(p * 6.14) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.64) * smoothstep(0.09, 0.0, length(sf2)) * step(0.90, sh2) * (0.41 + 0.27 * sin((time * 0.69) * 3.87 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.15 + fa * 0.85 + (time * 0.69) * -0.28;
		float wv = vnoise2(vec2(xx, (time * 0.69) * 0.41 + fa * 7.31));
		float yc = 0.10 + (wv - 0.5) * 1.28;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.73) * exp(-max(dy, 0.0) * 4.73);
		bnd *= 0.64 + 0.37 * sin(xx * 2.54 + (time * 0.69) * 0.73 + fa);
		col += (vec3(0.30) + 0.19 * cos(vec3(0.0, 0.42, 0.83) + fa * 1.01 + (time * 0.69) * 0.37)) * bnd * 0.66;
	}
	col = col / (1.0 + col * 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.008, 0.954) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
