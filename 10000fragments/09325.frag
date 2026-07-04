uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.52 + 0.36 * sin(time * 1.05);
	float n2 = 2.13 + 0.63 * cos(time * 1.15);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = sin(d * 21.96 - time * 5.69);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.71 + time * 0.25);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.49 + time * 17.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
