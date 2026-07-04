uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * -1.20) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.45 + 0.68 * sin(time * 0.89);
	float n2 = 0.97 + 0.33 * cos(time * 1.40);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.70, 0.53, 0.16) * (0.07 / (abs(v * 1.31 + sr * 1.05) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.62;
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 2.93 + time * 16.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
