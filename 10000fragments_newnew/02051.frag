uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = rot2(time * 1.03) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.90 + 0.37 * sin(time * 2.00);
	float n2 = 1.38 + 0.79 * cos(time * 1.68);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = vec3(0.35, 0.64, 0.35) * (0.24 / (abs(v * 2.03 + sr * 1.77) + 0.09));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.77;
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.82 + time * 13.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
