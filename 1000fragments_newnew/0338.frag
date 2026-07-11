uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.72 + 0.76 * sin((time * 0.81) * 1.27);
	float n2 = 1.98 + 0.26 * cos((time * 0.81) * 0.82);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.11, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.15 + sr * 0.73), 0.0, 1.0);
	vec3 col = mix(vec3(0.80, 0.88, 0.70), vec3(0.05, 0.13, 0.06), cc);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.74;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.998, 0.980) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
