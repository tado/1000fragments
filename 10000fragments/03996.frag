uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.66 + 0.10 * sin(time * 1.25);
	float n2 = 1.15 + 0.52 * cos(time * 0.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * v * 1.51 + sr * 1.15, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.21, 0.16), vec3(0.70, 0.73, 0.55), cc);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
