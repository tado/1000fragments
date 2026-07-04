uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.99;
	p = rot2(time * 0.47) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.74 + 0.12 * sin(time * 0.76);
	float n2 = 2.23 + 0.27 * cos(time * 1.52);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.51;
	float d = sr - rr;
	float v = sin(d * 28.78 - time * 1.82);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.66 + time * 0.39);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
