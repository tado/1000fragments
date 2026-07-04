uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.69 + 0.26 * sin(time * 1.59);
	float n2 = 0.81 + 0.36 * cos(time * 0.67);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = vec3(0.93, 0.59, 0.59) * (0.22 / (abs(v * 2.28 + sr * 1.61) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
