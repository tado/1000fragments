uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.40 + 0.28 * sin(time * 1.29);
	float n2 = 2.31 + 0.42 * cos(time * 1.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	float cc = clamp(0.5 + 0.5 * v * 1.09 + sr * 1.70, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.20, 0.26), vec3(0.89, 0.63, 0.95), cc);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
