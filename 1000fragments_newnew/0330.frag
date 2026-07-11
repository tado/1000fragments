uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	p = rot2((time * 0.50) * 1.59) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.42 + 0.38 * sin((time * 0.50) * 0.77);
	float n2 = 2.49 + 0.92 * cos((time * 0.50) * 0.63);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.88 + sr * 0.75), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.02, 0.09), vec3(0.70, 0.70, 0.80), cc);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.87;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 0.999, 1.011) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
