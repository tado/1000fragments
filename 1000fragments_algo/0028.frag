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
	vec3 col = vec3(0.04, 0.05, 0.07) * clamp(0.39 - p.y * 0.24, 0.0, 1.0);
	vec2 sc2 = floor(p * 7.32); vec2 sf2 = fract(p * 7.32) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.67) * smoothstep(0.07, 0.0, length(sf2)) * step(0.93, sh2) * (0.49 + 0.28 * sin((time * 0.75) * 1.93 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.83 + fa * 1.28 + (time * 0.75) * 0.21;
		float wv = vnoise2(vec2(xx, (time * 0.75) * 0.24 + fa * 7.31));
		float yc = 0.19 + (wv - 0.5) * 1.27;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 10.70);
		bnd *= 0.60 + 0.41 * sin(xx * 3.45 + (time * 0.75) * 0.99 + fa);
		col += (vec3(0.45) + 0.28 * cos(vec3(0.0, 0.53, 1.07) + fa * 1.14 + (time * 0.75) * 0.16)) * bnd * 1.19;
	}
	col = col / (1.0 + col * 0.85);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.976, 1.023, 0.960) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
