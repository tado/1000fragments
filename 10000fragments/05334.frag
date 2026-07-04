uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p = rot2(time * 1.18) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.66 + 0.64 * sin(time * 1.91);
	float n2 = 1.87 + 0.90 * cos(time * 0.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = sin(d * 26.28 - time * 2.64);
	vec3 col = vec3(0.94, 0.53, 0.98) * (0.11 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
