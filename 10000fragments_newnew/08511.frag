uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -1.59) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.76 + 0.29 * sin(time * 1.20);
	float n2 = 2.32 + 0.74 * cos(time * 1.09);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.01, 0.54, 1.14) + vec3(0.17, 0.17, 0.24);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
