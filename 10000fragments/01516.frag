uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * 1.24) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.67 + 0.11 * sin(time * 0.70);
	float n2 = 2.10 + 0.54 * cos(time * 1.48);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.06, 0.28), vec3(0.81, 0.85, 0.79), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
