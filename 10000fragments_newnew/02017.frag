uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p = rot2(time * -0.31) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.62 + 0.31 * sin(time * 0.78);
	float n2 = 2.18 + 0.96 * cos(time * 0.92);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * v * 2.04 + sr * 1.13, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.12, 0.17), vec3(0.75, 0.75, 0.96), cc);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.92;
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 2.84 + time * 6.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
