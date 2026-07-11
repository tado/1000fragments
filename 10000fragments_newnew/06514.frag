uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.69 + 0.50 * sin(time * 1.15);
	float n2 = 2.49 + 0.81 * cos(time * 0.40);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = vec3(0.5 + 0.5 * v * 1.85 + sr * 1.36) * vec3(1.45, 0.92, 1.17) + vec3(0.07, 0.24, 0.07);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
