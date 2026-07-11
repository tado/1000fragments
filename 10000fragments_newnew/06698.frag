uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(time * -0.59) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.37 + 0.27 * sin(time * 1.03);
	float n2 = 0.91 + 0.36 * cos(time * 1.37);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 16.93 - time * 3.18);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.36, 0.41), vec3(0.69, 0.80, 0.45), cc);
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
