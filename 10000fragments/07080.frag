uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.39 + 0.19 * sin(time * 1.61);
	float n2 = 2.28 + 0.72 * cos(time * 1.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.03 + sr * 1.02 * 1.71 + time * 0.10);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.74;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.00 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
