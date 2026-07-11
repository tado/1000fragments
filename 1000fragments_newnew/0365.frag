uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p = rot2((time * 0.70) * 0.72) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.98 + 0.62 * sin((time * 0.70) * 1.32);
	float n2 = 2.45 + 0.99 * cos((time * 0.70) * 1.54);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.71;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.68 + sr * 0.70), 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.16, 0.25), vec3(0.60, 0.47, 0.44), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.67;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 0.991, 1.037) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
