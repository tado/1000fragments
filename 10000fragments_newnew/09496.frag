uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.27 + 0.50 * sin(time * 0.73);
	float n2 = 1.43 + 0.20 * cos(time * 0.92);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.68, 1.01, 1.49) + vec3(0.04, 0.08, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
