uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.99 + 0.35 * sin(time * 0.73);
	float n2 = 2.21 + 0.94 * cos(time * 0.70);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = sin(d * 21.29 - time * 5.34);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.85, 1.20, 1.36) + vec3(0.12, 0.17, 0.03);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.34 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
