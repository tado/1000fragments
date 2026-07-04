uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * -0.31) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.08 + 0.38 * sin(time * 1.50);
	float n2 = 0.85 + 0.49 * cos(time * 1.27);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.51;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.30, 0.41, 0.88) * (0.11 / (abs(v) + 0.10));
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.52 + time * 10.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
