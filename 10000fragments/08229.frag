uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2(time * 0.72) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.98 + 0.27 * sin(time * 1.34);
	float n2 = 1.98 + 0.77 * cos(time * 1.47);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 13.43 - time * 1.73);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.64 + time * 0.11);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 2.09 + time * 12.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
