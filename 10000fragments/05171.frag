uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(time * -0.53) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.84 + 0.19 * sin(time * 0.60);
	float n2 = 2.40 + 0.63 * cos(time * 0.83);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = vec3(0.39, 0.64, 0.15) * (0.07 / (abs(v * 2.25 + sr * 1.99) + 0.06));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
