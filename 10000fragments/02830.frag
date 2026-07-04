uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.72 + 0.22 * sin(time * 0.84);
	float n2 = 1.01 + 0.68 * cos(time * 1.63);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.63;
	float d = sr - rr;
	float v = sin(d * 22.70 - time * 3.85);
	vec3 col = vec3(0.34, 0.88, 0.78) * (0.08 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
