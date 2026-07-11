uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.89 + 0.74 * sin(time * 1.99);
	float n2 = 2.29 + 0.42 * cos(time * 0.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.58;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	float cc = clamp(0.5 + 0.5 * v * 1.97 + sr * 0.72, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.08, 0.13), vec3(0.73, 0.91, 0.58), cc);
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.66;
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
