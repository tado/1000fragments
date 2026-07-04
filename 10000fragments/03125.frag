uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.00 + 0.48 * sin(time * 1.02);
	float n2 = 2.35 + 0.91 * cos(time * 1.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.23 + sr * 0.79 * 3.88 + time * 0.75);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.75;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
