uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.19 + 0.74 * sin(time * 1.13);
	float n2 = 1.25 + 0.74 * cos(time * 1.27);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.26 + sr * 0.83 * 1.51 + time * 0.63);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.79;
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.56 + time * 5.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
