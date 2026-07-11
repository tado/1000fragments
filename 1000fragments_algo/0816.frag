uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.39 + 0.51 * sin((time * 0.73) * 0.94);
	float n2 = 1.43 + 0.25 * cos((time * 0.73) * 1.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.89 + sr * 1.51)) * vec3(0.60, 0.58, 0.52) + vec3(0.04, 0.02, 0.01);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.77;
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.961, 1.040) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
