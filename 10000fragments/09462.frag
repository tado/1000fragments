uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.72 + 0.36 * sin(time * 1.26);
	float n2 = 1.97 + 0.43 * cos(time * 0.44);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = vec3(0.96, 0.27, 0.31) * (0.21 / (abs(v * 1.94 + sr * 1.65) + 0.03));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
