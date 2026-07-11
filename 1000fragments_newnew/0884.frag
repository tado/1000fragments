uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p = rot2((time * 0.79) * 1.57) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.39 + 0.48 * sin((time * 0.79) * 0.65);
	float n2 = 0.88 + 0.86 * cos((time * 0.79) * 1.07);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.43 + sr * 1.37), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.17, 0.15), vec3(0.76, 0.67, 0.62), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.89;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.935, 0.979, 1.052) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
