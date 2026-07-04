uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = rot2(time * -1.28) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.58 + 0.74 * sin(time * 1.22);
	float n2 = 1.42 + 0.91 * cos(time * 0.98);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.28 + sr * 0.55 * 2.39 + time * 0.92);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
