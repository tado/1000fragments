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
	p += vec2(sin((time * 0.80) * 0.56), cos((time * 0.80) * 1.11)) * 0.24;
	vec3 col = vec3(0.08, 0.12, 0.10) * clamp(0.37 - p.y * 0.42, 0.0, 1.0);
	vec2 sc2 = floor(p * 7.26); vec2 sf2 = fract(p * 7.26) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.42) * smoothstep(0.08, 0.0, length(sf2)) * step(0.91, sh2) * (0.57 + 0.23 * sin((time * 0.80) * 3.31 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 0.92 + fa * 1.12 + (time * 0.80) * -0.06;
		float wv = vnoise2(vec2(xx, (time * 0.80) * 0.43 + fa * 7.31));
		float yc = 0.24 + (wv - 0.5) * 0.87;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.95) * exp(-max(dy, 0.0) * 1.41);
		bnd *= 0.65 + 0.41 * sin(xx * 2.28 + (time * 0.80) * 1.31 + fa);
		col = max(col, (vec3(0.45) + 0.15 * cos(vec3(4.253, 5.318, 6.383) + fa * 0.46 + (time * 0.80) * 0.51)) * bnd * 0.72);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.025, 0.975, 0.997);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
