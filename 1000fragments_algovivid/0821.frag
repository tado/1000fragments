uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2((time * 0.67) * -1.60) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.97 + 0.55 * sin((time * 0.67) * 1.63);
	float n2 = 0.93 + 0.21 * cos((time * 0.67) * 1.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.55 + sr * 1.48), 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.09, 0.28), vec3(0.43, 0.50, 0.51), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.64;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.012, 1.011) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
