uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.25 + 0.52 * sin(time * 1.64);
	float n2 = 0.76 + 0.81 * cos(time * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = vec3(0.37, 0.21, 0.88) * (0.17 / (abs(v * 2.44 + sr * 0.58) + 0.09));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.78;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
