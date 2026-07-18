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
	vec2 q = p * 1.88 + vec2(2.73, 3.26);
	float nt = (time * 0.79) * 0.34;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.73); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 2.39 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.82); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.052, 0.073, 0.038), vec3(0.377, 0.502, 0.188), smoothstep(0.22, 0.64, den));
	col = mix(col, vec3(0.985, 0.876, 0.531), smoothstep(0.63, 1.02, den));
	col += vec3(0.981, 0.471, 0.429) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.29;
	vec2 sc9 = floor(p * 8.32); vec2 sf9 = fract(p * 8.32) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.08, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.90, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.54 + 0.34 * sin((time * 0.79) * 4.03 + sh9 * 40.0));
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.57 + (time * 0.79) * 16.09);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.944, 0.994, 1.041);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
