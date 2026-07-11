uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.77 + 0.54 * sin((time * 0.70) * 0.88);
	float n2 = 0.55 + 0.24 * cos((time * 0.70) * 0.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.35 + sr * 0.63), 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.10, 0.08), vec3(0.69, 0.75, 0.83), cc);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.91;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 0.995, 1.006) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
