uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(time * -0.58) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.60 + 0.76 * sin(time * 1.44);
	float n2 = 1.71 + 0.50 * cos(time * 1.25);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = sin(d * 26.35 - time * 5.95);
	vec3 col = vec3(0.72, 0.72, 0.18) * (0.14 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
