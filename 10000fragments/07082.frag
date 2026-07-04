uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.10 + 0.13 * sin(time * 1.46);
	float n2 = 2.05 + 0.42 * cos(time * 1.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.78 + sr * 0.67 * 4.45 + time * 0.10);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
