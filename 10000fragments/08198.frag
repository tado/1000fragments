uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.72 + 0.63 * sin(time * 0.59);
	float n2 = 1.57 + 0.78 * cos(time * 1.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.36 + sr * 1.48 * 2.43 + time * 0.12);
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.68;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
