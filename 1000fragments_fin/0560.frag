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
	vec2 q = p * 1.54 + vec2(4.71, 13.45);
	float nt = (time * 0.84) * 0.30;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.83); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.95 + 31.0;
	for(int mi = 0; mi < 4; mi++){ n2 += na * vnoise2(nq - nt * 0.54); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.085, 0.079, 0.056), vec3(0.715, 0.276, 0.143), smoothstep(0.24, 0.65, den));
	col = mix(col, vec3(0.983, 0.805, 0.636), smoothstep(0.62, 1.01, den));
	col += vec3(0.895, 0.953, 0.663) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.41;
	vec2 sc9 = floor(p * 11.73); vec2 sf9 = fract(p * 11.73) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.08, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.95, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.40 + 0.30 * sin((time * 0.84) * 4.81 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.964, 1.015, 0.951);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
