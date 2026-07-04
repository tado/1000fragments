uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.67 + 0.51 * sin(time * 0.98);
	float n2 = 1.34 + 0.62 * cos(time * 1.38);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = sin(d * 24.54 - time * 1.30);
	vec3 col = vec3(0.23, 0.59, 0.57) * (0.21 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 1.05 + time * 5.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
