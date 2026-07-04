uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	p = rot2(time * 1.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.50 + 0.63 * sin(time * 0.89);
	float n2 = 1.37 + 0.45 * cos(time * 1.38);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = sin(d * 28.67 - time * 2.65);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.55, 0.92, 1.14) + vec3(0.23, 0.18, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
