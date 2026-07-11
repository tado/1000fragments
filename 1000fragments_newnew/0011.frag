uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.09 + 0.78 * sin((time * 0.69) * 0.69);
	float n2 = 1.49 + 0.61 * cos((time * 0.69) * 1.02);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = vec3(0.39, 0.48, 0.31) * (0.10 / (abs((v * 1.72 + sr * 1.66)) + 0.04));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.77;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.971, 1.013, 0.956) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
