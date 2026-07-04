uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2(time * -1.49) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.04 + 0.36 * sin(time * 0.67);
	float n2 = 1.35 + 0.88 * cos(time * 1.21);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = sin(d * 28.76 - time * 4.45);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.06, 0.89, 1.33) + vec3(0.05, 0.15, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
