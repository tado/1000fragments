uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.21 + 0.63 * sin(time * 0.97);
	float n2 = 1.44 + 0.70 * cos(time * 1.31);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	vec3 col = vec3(0.38, 0.75, 0.57) * (0.18 / (abs(v * 2.47 + sr * 0.99) + 0.10));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.85;
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 1.81 + time * 15.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
