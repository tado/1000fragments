uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.23 + 0.78 * sin(time * 1.68);
	float n2 = 0.89 + 0.87 * cos(time * 1.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * v * 1.55 + sr * 1.60, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.10, 0.01), vec3(0.59, 0.87, 0.88), cc);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
