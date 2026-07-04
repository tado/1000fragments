uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.85 + 0.40 * sin(time * 1.92);
	float n2 = 0.65 + 0.40 * cos(time * 0.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.01 + sr * 1.57 * 2.16 + time * 0.69);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
