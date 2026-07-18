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
	p.x += p.y * -0.56;
	vec2 q = p * 1.88 + vec2(11.58, 9.09);
	float nt = (time * 0.55) * 0.25;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 3; ni++){ n1 += na * vnoise2(nq + nt * 0.73); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.43 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.84); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.104, 0.032, 0.142), vec3(0.728, 0.342, 0.455), smoothstep(0.16, 0.64, den));
	col = mix(col, vec3(1.000, 0.940, 0.806), smoothstep(0.61, 1.08, den));
	col += vec3(1.000, 0.741, 0.540) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.28;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.986, 1.004, 1.007);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
