uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.73 + 0.44 * sin((time * 0.82) * 1.83);
	float n2 = 0.94 + 0.69 * cos((time * 0.82) * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.55;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.74 + sr * 0.94), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.16, 0.33), vec3(0.45, 0.38, 0.45), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.82;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.933, 0.988, 1.036) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
