uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * -1.49) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.43 + 0.78 * sin(time * 1.80);
	float n2 = 1.99 + 0.27 * cos(time * 0.56);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.20, 0.61, 0.84) * (0.14 / (abs(v * 2.36 + sr * 1.88) + 0.04));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
