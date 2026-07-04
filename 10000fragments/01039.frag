uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.65 + 0.22 * sin(time * 1.39);
	float n2 = 1.70 + 0.71 * cos(time * 1.09);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 24.83 - time * 5.30);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.90 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
