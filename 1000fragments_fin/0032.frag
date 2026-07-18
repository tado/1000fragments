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
	vec3 col = vec3(0.08, 0.07, 0.09) * clamp(0.38 - p.y * 0.33, 0.0, 1.0);
	vec2 sc2 = floor(p * 13.58); vec2 sf2 = fract(p * 13.58) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.40) * smoothstep(0.07, 0.0, length(sf2)) * step(0.94, sh2) * (0.56 + 0.21 * sin((time * 0.83) * 3.98 + sh2 * 40.0));
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 0.95 + fa * 1.51 + (time * 0.83) * -0.06;
		float wv = vnoise2(vec2(xx, (time * 0.83) * 0.19 + fa * 7.31));
		float yc = 0.32 + (wv - 0.5) * 1.06;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.17) * exp(-max(dy, 0.0) * 4.86);
		bnd *= 0.66 + 0.33 * sin(xx * 5.40 + (time * 0.83) * 1.85 + fa);
		col += (vec3(0.42) + 0.26 * cos(vec3(4.032, 4.922, 5.811) + fa * 1.12 + (time * 0.83) * 0.66)) * bnd * 1.03;
	}
	col = col / (1.0 + col * 0.82);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.984, 1.018, 0.947);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
