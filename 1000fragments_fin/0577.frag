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
	p += vec2(sin((time * 0.69) * 0.97), cos((time * 0.69) * 0.47)) * 0.21;
	vec2 q = p * 2.00 + vec2(2.23, 2.60);
	float nt = (time * 0.69) * 0.12;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.37); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.11 + 31.0;
	for(int mi = 0; mi < 4; mi++){ n2 += na * vnoise2(nq - nt * 0.73); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	den = 1.0 - abs(den * 2.0 - 1.0); den *= den;
	vec3 col = mix(vec3(0.029, 0.048, 0.087), vec3(0.467, 0.191, 0.670), smoothstep(0.11, 0.60, den));
	col = mix(col, vec3(0.983, 0.681, 0.855), smoothstep(0.63, 1.10, den));
	col += vec3(0.787, 0.732, 1.000) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.67;
	vec2 sc9 = floor(p * 8.53); vec2 sf9 = fract(p * 8.53) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.10, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.95, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.46 + 0.34 * sin((time * 0.69) * 4.69 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.025, 0.990, 0.935);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
