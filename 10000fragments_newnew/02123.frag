uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = rot2(time * 0.50) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.98 + 0.32 * sin(time * 0.83);
	float n2 = 1.95 + 0.91 * cos(time * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = vec3(0.18, 0.48, 0.95) * (0.19 / (abs(v * 1.34 + sr * 0.53) + 0.06));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
