uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	p = rot2((time * 0.77) * 0.89) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.78 + 0.40 * sin((time * 0.77) * 1.77);
	float n2 = 1.63 + 0.81 * cos((time * 0.77) * 1.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.19 + sr * 1.30), 0.0, 1.0);
	vec3 col = mix(vec3(0.44, 0.36, 0.24), vec3(0.45, 0.54, 0.47), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.64;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.996, 1.022) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
