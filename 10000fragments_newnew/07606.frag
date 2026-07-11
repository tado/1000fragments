uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	p = rot2(time * -0.70) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.93 + 0.75 * sin(time * 0.71);
	float n2 = 1.65 + 0.60 * cos(time * 0.59);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = sin(d * 20.88 - time * 1.15);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.73, 0.63, 1.09) + vec3(0.20, 0.03, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
