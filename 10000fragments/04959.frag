uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.91 + 0.73 * sin(time * 1.86);
	float n2 = 0.61 + 0.21 * cos(time * 1.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.67;
	float d = sr - rr;
	float v = sin(d * 24.64 - time * 4.52);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.79, 0.70, 1.23) + vec3(0.05, 0.12, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
