uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.99 + 0.24 * sin(time * 2.00);
	float n2 = 1.22 + 0.52 * cos(time * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = sin(d * 25.71 - time * 1.42);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.09, 1.08, 1.16) + vec3(0.03, 0.10, 0.10);
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 1.76 + time * 8.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
