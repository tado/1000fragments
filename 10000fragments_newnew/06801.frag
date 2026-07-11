uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.88 + 0.66 * sin(time * 0.62);
	float n2 = 1.38 + 0.71 * cos(time * 1.20);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.77;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	float cc = clamp(0.5 + 0.5 * v * 1.80 + sr * 1.44, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.02, 0.39), vec3(0.87, 0.85, 0.68), cc);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
