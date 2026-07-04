uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.57 + 0.34 * sin(time * 1.95);
	float n2 = 2.30 + 0.55 * cos(time * 0.98);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = sin(d * 29.15 - time * 2.86);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.54 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
