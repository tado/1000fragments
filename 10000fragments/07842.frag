uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	p = rot2(time * 0.82) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.58 + 0.35 * sin(time * 1.65);
	float n2 = 1.89 + 0.29 * cos(time * 1.37);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.70;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.97, 0.19, 0.75) * (0.05 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
