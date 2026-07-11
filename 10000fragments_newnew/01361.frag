uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.75 + 0.52 * sin(time * 1.49);
	float n2 = 2.28 + 0.65 * cos(time * 1.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.82;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.59, 0.70, 0.52) * (0.12 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
