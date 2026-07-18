uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.73) * 0.59), cos((time * 0.73) * 0.59)) * 0.21;
	p *= 0.90;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.66 + 0.58 * sin((time * 0.73) * 1.97);
	float n2 = 0.85 + 0.63 * cos((time * 0.73) * 0.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.63;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.08 + sr * 0.58)) * vec3(0.68, 0.57, 0.69) + vec3(0.05, 0.10, 0.12);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.93;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.022, 0.963, 1.003);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
