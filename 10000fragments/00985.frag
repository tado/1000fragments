uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * 0.94) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.98 + 0.47 * sin(time * 1.80);
	float n2 = 2.39 + 0.40 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = sin(d * 17.94 - time * 3.91);
	vec3 col = vec3(1.00, 0.63, 0.91) * (0.24 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
