uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.09 + 0.47 * sin(time * 1.63);
	float n2 = 0.62 + 0.33 * cos(time * 1.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.49, 0.74, 0.56) * (0.06 / (abs(v * 1.81 + sr * 0.82) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.82;
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
