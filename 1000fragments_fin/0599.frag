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
	vec2 q = p * 1.82 + vec2(11.60, 9.23);
	float nt = (time * 0.78) * 0.26;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 5; ni++){ n1 += na * vnoise2(nq + nt * 0.49); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 2.34 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.92); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.028, 0.019, 0.110), vec3(0.457, 0.214, 0.650), smoothstep(0.13, 0.77, den));
	col = mix(col, vec3(1.000, 0.720, 0.850), smoothstep(0.62, 1.00, den));
	col += vec3(0.891, 0.891, 0.631) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.29;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.989, 0.986, 0.992);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
