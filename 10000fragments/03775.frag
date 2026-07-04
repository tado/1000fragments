uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.85 + 0.55 * sin(time * 0.87);
	float n2 = 2.13 + 0.80 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.77 + sr * 1.69 * 2.25 + time * 0.23);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
