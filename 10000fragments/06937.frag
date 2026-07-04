uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	p = rot2(time * 0.59) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.74 + 0.57 * sin(time * 1.37);
	float n2 = 0.82 + 0.34 * cos(time * 0.93);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = sin(d * 13.69 - time * 5.54);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.93 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
