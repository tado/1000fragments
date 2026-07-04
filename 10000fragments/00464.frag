uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p = rot2(time * -1.14) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.11 + 0.13 * sin(time * 0.61);
	float n2 = 0.65 + 0.92 * cos(time * 1.09);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = vec3(0.88, 0.16, 0.68) * (0.16 / (abs(v * 1.32 + sr * 0.67) + 0.03));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.90;
	col = mod(col * 1.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
