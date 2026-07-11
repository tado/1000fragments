uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.63 + 0.17 * sin(time * 1.83);
	float n2 = 0.51 + 0.43 * cos(time * 1.55);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.70;
	float d = sr - rr;
	float v = sin(d * 23.97 - time * 2.41);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.75 + time * 0.47);
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
