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
	vec2 q = p * 2.46 + vec2(9.54, 2.47);
	float nt = (time * 0.67) * 0.26;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.97); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 2.40 + 31.0;
	for(int mi = 0; mi < 3; mi++){ n2 += na * vnoise2(nq - nt * 0.63); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.118, 0.030, 0.128), vec3(0.771, 0.349, 0.472), smoothstep(0.17, 0.65, den));
	col = mix(col, vec3(0.968, 0.924, 0.839), smoothstep(0.64, 1.05, den));
	col += vec3(0.848, 0.938, 0.668) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.60;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.000, 0.946, 1.013);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
