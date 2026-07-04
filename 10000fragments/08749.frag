uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.25 + 0.66 * sin(time * 1.19);
	float n2 = 0.84 + 0.69 * cos(time * 1.17);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = sin(d * 28.21 - time * 4.99);
	vec3 col = vec3(0.96, 0.79, 1.00) * (0.06 / (abs(v) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
