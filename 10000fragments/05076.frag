uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.79 + 0.35 * sin(time * 1.94);
	float n2 = 1.07 + 0.59 * cos(time * 1.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = sin(d * 27.67 - time * 3.28);
	vec3 col = vec3(0.65, 0.41, 0.99) * (0.17 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
