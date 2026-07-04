uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.99 + 0.55 * sin(time * 1.66);
	float n2 = 0.80 + 0.48 * cos(time * 0.66);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * v * 1.58 + sr * 0.59, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.15, 0.23), vec3(0.75, 1.00, 0.90), cc);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.71;
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
