uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p = rot2(time * -0.63) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.98 + 0.62 * sin(time * 1.44);
	float n2 = 1.96 + 0.70 * cos(time * 1.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.65;
	float d = sr - rr;
	float v = sin(d * 20.44 - time * 2.89);
	vec3 col = vec3(0.78, 0.27, 0.18) * (0.15 / (abs(v) + 0.02));
	col = col / (1.0 + col);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 1.81 + time * 17.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
