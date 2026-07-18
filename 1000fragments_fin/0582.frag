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
	p += vec2(sin((time * 0.66) * 0.45), cos((time * 0.66) * 0.47)) * 0.09;
	p.x += p.y * -0.33;
	vec2 q = p * 1.96 + vec2(11.95, 12.73);
	float nt = (time * 0.66) * 0.19;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 3; ni++){ n1 += na * vnoise2(nq + nt * 0.87); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.12 + 31.0;
	for(int mi = 0; mi < 4; mi++){ n2 += na * vnoise2(nq - nt * 0.38); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.000, 0.028, 0.057), vec3(0.249, 0.312, 0.775), smoothstep(0.13, 0.78, den));
	col = mix(col, vec3(0.642, 0.940, 1.000), smoothstep(0.63, 0.98, den));
	col += vec3(0.710, 0.952, 0.812) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.36;
	vec2 sc9 = floor(p * 9.46); vec2 sf9 = fract(p * 9.46) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.06, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.95, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.35 + 0.27 * sin((time * 0.66) * 4.33 + sh9 * 40.0));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.962, 0.996, 0.950);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
