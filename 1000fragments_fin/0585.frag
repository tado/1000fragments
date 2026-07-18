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
	p.x = abs(p.x) - 0.24;
	p.x += p.y * -0.31;
	vec2 q = p * 2.34 + vec2(13.08, 13.53);
	float nt = (time * 0.74) * 0.19;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 5; ni++){ n1 += na * vnoise2(nq + nt * 0.30); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.75 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.82); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.066, 0.070, 0.037), vec3(0.687, 0.302, 0.174), smoothstep(0.19, 0.69, den));
	col = mix(col, vec3(0.986, 0.839, 0.645), smoothstep(0.61, 1.08, den));
	col += vec3(0.962, 0.555, 0.289) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.46;
	vec2 sc9 = floor(p * 16.43); vec2 sf9 = fract(p * 16.43) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.06, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.91, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.49 + 0.44 * sin((time * 0.74) * 3.66 + sh9 * 40.0));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.035, 1.001, 0.924);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
