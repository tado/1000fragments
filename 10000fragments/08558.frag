uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(time * -1.17) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.36 + 0.15 * sin(time * 1.25);
	float n2 = 1.35 + 0.67 * cos(time * 0.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = vec3(0.70, 0.90, 0.28) * (0.11 / (abs(v * 2.18 + sr * 0.52) + 0.06));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.67;
	col = fract(col * 2.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
