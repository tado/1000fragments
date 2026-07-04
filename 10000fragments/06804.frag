uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * -1.42) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.71 + 0.29 * sin(time * 0.56);
	float n2 = 1.98 + 0.77 * cos(time * 0.70);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = vec3(0.83, 0.22, 0.35) * (0.23 / (abs(v * 2.33 + sr * 1.03) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
