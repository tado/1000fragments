uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p *= 1.06;
	p = rot2((time * 0.84) * -0.75) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.60 + 0.65 * sin((time * 0.84) * 1.99);
	float n2 = 1.57 + 0.69 * cos((time * 0.84) * 0.72);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.24 + sr * 1.92), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.09, 0.15), vec3(0.63, 0.61, 0.63), cc);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.82;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 0.999, 0.923) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
