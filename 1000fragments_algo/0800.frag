uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.84) * 0.84), cos((time * 0.84) * 0.93)) * 0.09;
	p.x = abs(p.x) - 0.55;
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.94 + 0.68 * sin((time * 0.84) * 0.72);
	float n2 = 0.88 + 0.97 * cos((time * 0.84) * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.59 + sr * 1.20)) * vec3(0.43, 0.44, 0.46) + vec3(0.10, 0.10, 0.07);
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.77;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.944, 1.029) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
