uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.96 + 0.17 * sin(time * 0.96);
	float n2 = 1.14 + 0.77 * cos(time * 1.80);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = vec3(0.5 + 0.5 * v * 1.50 + sr * 1.65) * vec3(1.15, 1.46, 0.75) + vec3(0.22, 0.02, 0.02);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.63;
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 1.72 + time * 17.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
