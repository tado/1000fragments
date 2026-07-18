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
	p *= 0.87;
	p.x += p.y * -0.55;
	vec2 q = p * 2.58 + vec2(15.10, 8.35);
	float nt = (time * 0.70) * 0.34;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.62); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.31 + 31.0;
	for(int mi = 0; mi < 3; mi++){ n2 += na * vnoise2(nq - nt * 0.78); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.029, 0.068, 0.075), vec3(0.361, 0.484, 0.175), smoothstep(0.22, 0.63, den));
	col = mix(col, vec3(1.000, 0.888, 0.571), smoothstep(0.62, 1.09, den));
	col += vec3(0.873, 0.277, 0.218) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.63;
	vec2 sc9 = floor(p * 11.84); vec2 sf9 = fract(p * 11.84) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.06, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.91, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.49 + 0.27 * sin((time * 0.70) * 4.01 + sh9 * 40.0));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.962, 0.999, 0.945);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
