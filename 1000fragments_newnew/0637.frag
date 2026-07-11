uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.75 + 0.69 * sin((time * 0.80) * 1.52);
	float n2 = 2.49 + 0.81 * cos((time * 0.80) * 1.31);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.59 + sr * 0.86), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.10, 0.11), vec3(0.74, 0.80, 0.85), cc);
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.69;
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 1.14 + (time * 0.80) * 16.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 0.961, 1.015) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
