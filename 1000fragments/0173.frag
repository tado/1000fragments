uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.21 + 0.50 * sin(time * 0.82);
	float n2 = 0.81 + 0.99 * cos(time * 1.31);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.40 + sr * 1.35 * 2.01 + time * 0.35);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.78;
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 2.42 + time * 16.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
