uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.80 + 0.33 * sin(time * 1.23);
	float n2 = 1.40 + 0.76 * cos(time * 0.55);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = sin(d * 21.07 - time * 1.14);
	vec3 col = vec3(0.71, 0.36, 0.92) * (0.07 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 2.49 + time * 12.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
