uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.52 + 0.50 * sin(time * 0.83);
	float n2 = 1.34 + 0.42 * cos(time * 1.24);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.91 + sr * 1.54 * 3.08 + time * 0.34);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.82;
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
