uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.33 + 0.28 * sin(time * 1.85);
	float n2 = 1.04 + 0.35 * cos(time * 1.31);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = sin(d * 15.62 - time * 4.96);
	vec3 col = vec3(0.63, 0.91, 0.66) * (0.18 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
