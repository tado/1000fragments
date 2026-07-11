uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.65 + 0.75 * sin(time * 0.73);
	float n2 = 0.97 + 0.21 * cos(time * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.70;
	float d = sr - rr;
	float v = sin(d * 23.76 - time * 2.87);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.54 + time * 0.24);
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.89 + time * 17.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
