uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.70 + 0.12 * sin(time * 1.87);
	float n2 = 1.96 + 0.39 * cos(time * 0.93);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.39 + sr * 0.77 * 2.41 + time * 0.19);
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.67;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
