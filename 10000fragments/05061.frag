uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	p = rot2(time * 0.95) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.62 + 0.79 * sin(time * 0.80);
	float n2 = 1.08 + 0.41 * cos(time * 1.56);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.17, 0.34, 0.85) * (0.22 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
