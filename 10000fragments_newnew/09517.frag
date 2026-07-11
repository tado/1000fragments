uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.65 + 0.80 * sin(time * 0.99);
	float n2 = 2.14 + 0.78 * cos(time * 0.63);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.74, 1.49, 1.20) + vec3(0.15, 0.11, 0.24);
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.32 + time * 12.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
