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
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p.y = abs(p.y) - 0.47;
	p += vec2(sin((time * 0.74) * 0.50), cos((time * 0.74) * 0.96)) * 0.17;
	p = p.yx;
	vec3 col = vec3(0.05, 0.03, 0.03) * clamp(0.48 - p.y * 0.49, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.98); vec2 sf2 = fract(p * 9.98) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.45) * smoothstep(0.04, 0.0, length(sf2)) * step(0.93, sh2) * (0.43 + 0.35 * sin((time * 0.74) * 3.29 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 0.85 + fa * 1.03 + (time * 0.74) * -0.11;
		float wv = vnoise2(vec2(xx, (time * 0.74) * 0.45 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.74) * 0.52 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.22 + (wv - 0.5) * 1.51;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.96) * exp(-max(dy, 0.0) * 4.71);
		bnd *= 0.61 + 0.38 * sin(xx * 4.69 + (time * 0.74) * 1.17 + fa);
		col += (vec3(0.34) + 0.26 * cos(vec3(4.723, 6.104, 7.484) + fa * 0.48 + (time * 0.74) * 0.20)) * bnd * 0.63;
	}
	col = col / (1.0 + col * 0.79);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.023, 0.972, 0.937);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
