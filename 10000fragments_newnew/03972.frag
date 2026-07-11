uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.54 + 0.59 * sin(time * 1.95);
	float n2 = 1.92 + 0.92 * cos(time * 0.93);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = sin(d * 20.07 - time * 4.89);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.26 + time * 0.52);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.59 + time * 14.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
