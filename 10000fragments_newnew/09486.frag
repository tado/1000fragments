uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.29 + 0.23 * sin(time * 1.36);
	float n2 = 1.85 + 0.73 * cos(time * 1.24);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = vec3(0.82, 0.24, 0.67) * (0.20 / (abs(v * 1.41 + sr * 1.05) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.95;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
