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
	p += vec2(sin((time * 0.68) * 0.65), cos((time * 0.68) * 0.82)) * 0.09;
	vec3 col = vec3(0.06, 0.08, 0.10) * clamp(0.50 - p.y * 0.32, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.83); vec2 sf2 = fract(p * 8.83) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.45) * smoothstep(0.08, 0.0, length(sf2)) * step(0.93, sh2) * (0.42 + 0.36 * sin((time * 0.68) * 2.30 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.93 + fa * 1.20 + (time * 0.68) * -0.24;
		float wv = vnoise2(vec2(xx, (time * 0.68) * 0.44 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.68) * 0.22 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.04 + (wv - 0.5) * 1.26;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 20.62);
		bnd *= 0.69 + 0.42 * sin(xx * 5.48 + (time * 0.68) * 1.28 + fa);
		col += (vec3(0.31) + 0.23 * cos(vec3(5.380, 7.300, 9.221) + fa * 1.54 + (time * 0.68) * 0.56)) * bnd * 1.11;
	}
	col = col / (1.0 + col * 0.74);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.969, 1.004, 0.952);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
