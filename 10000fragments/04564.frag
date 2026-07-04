uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.60 + 0.77 * sin(time * 1.20);
	float n2 = 2.14 + 0.72 * cos(time * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * v * 2.48 + sr * 1.48, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.38, 0.27), vec3(0.78, 0.68, 0.57), cc);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
