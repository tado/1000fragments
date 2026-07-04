uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * 0.66) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.17 + 0.73 * sin(time * 1.26);
	float n2 = 1.30 + 0.62 * cos(time * 1.35);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	vec3 col = vec3(0.63, 0.35, 0.46) * (0.12 / (abs(v * 1.95 + sr * 1.89) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.79;
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
