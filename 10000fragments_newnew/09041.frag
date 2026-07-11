uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.31 + 0.79 * sin(time * 1.28);
	float n2 = 1.42 + 0.94 * cos(time * 1.79);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = vec3(0.5 + 0.5 * v * 1.28 + sr * 0.71) * vec3(1.43, 0.93, 1.29) + vec3(0.15, 0.23, 0.22);
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.68;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
