uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.77 + 0.77 * sin(time * 1.94);
	float n2 = 0.61 + 0.55 * cos(time * 1.17);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	float cc = clamp(0.5 + 0.5 * v * 1.49 + sr * 1.43, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.04, 0.22), vec3(0.88, 0.67, 0.68), cc);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.87;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
