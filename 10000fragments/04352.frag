uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = rot2(time * -0.68) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.00 + 0.63 * sin(time * 1.88);
	float n2 = 1.99 + 0.64 * cos(time * 1.59);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = sin(d * 28.06 - time * 2.15);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.32, 0.05), vec3(0.94, 0.81, 0.76), cc);
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
