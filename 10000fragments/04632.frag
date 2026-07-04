uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * 0.96) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.77 + 0.68 * sin(time * 1.43);
	float n2 = 1.35 + 0.46 * cos(time * 1.36);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	float cc = clamp(0.5 + 0.5 * v * 1.80 + sr * 1.73, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.27, 0.53), vec3(0.83, 0.74, 0.81), cc);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
