uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * 0.67) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.68 + 0.43 * sin(time * 1.43);
	float n2 = 2.35 + 0.49 * cos(time * 0.96);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.14, 0.15), vec3(0.79, 0.94, 0.62), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
