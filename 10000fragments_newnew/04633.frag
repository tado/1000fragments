uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * -1.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.87 + 0.43 * sin(time * 1.14);
	float n2 = 2.18 + 0.66 * cos(time * 1.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = sin(d * 11.80 - time * 4.87);
	vec3 col = vec3(0.40, 0.80, 0.81) * (0.13 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 1.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
