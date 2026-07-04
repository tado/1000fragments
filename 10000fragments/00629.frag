uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.83 + 0.63 * sin(time * 1.99);
	float n2 = 0.89 + 0.42 * cos(time * 0.45);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = vec3(0.5 + 0.5 * v * 1.24 + sr * 0.85) * vec3(1.05, 0.57, 1.49) + vec3(0.00, 0.22, 0.20);
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
