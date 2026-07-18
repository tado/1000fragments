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
	vec2 q = p * 1.81 + vec2(12.43, 8.05);
	float nt = (time * 0.86) * 0.17;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 3; ni++){ n1 += na * vnoise2(nq + nt * 0.78); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 2.98 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.92); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.036, 0.109, 0.101), vec3(0.178, 0.587, 0.463), smoothstep(0.23, 0.67, den));
	col = mix(col, vec3(0.975, 0.955, 0.890), smoothstep(0.61, 1.02, den));
	col += vec3(0.802, 0.942, 0.863) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.68;
	vec2 sc9 = floor(p * 9.47); vec2 sf9 = fract(p * 9.47) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.05, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.91, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.50 + 0.40 * sin((time * 0.86) * 4.94 + sh9 * 40.0));
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.983, 1.004, 0.939);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
