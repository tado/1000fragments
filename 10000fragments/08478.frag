uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.30 + 0.13 * sin(time * 0.53);
	float n2 = 0.61 + 0.65 * cos(time * 1.06);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.63 + sr * 0.73 * 1.50 + time * 0.29);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.84;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.65 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
