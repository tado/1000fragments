uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.93 + 0.30 * sin(time * 1.37);
	float n2 = 2.16 + 0.84 * cos(time * 0.92);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.16 + sr * 0.73 * 2.04 + time * 0.70);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
