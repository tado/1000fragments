uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = rot2(time * 1.58) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.84 + 0.78 * sin(time * 0.72);
	float n2 = 2.10 + 0.55 * cos(time * 1.21);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.85, 0.39, 0.24) * (0.12 / (abs(v * 2.31 + sr * 1.41) + 0.07));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
