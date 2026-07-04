uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.70 + 0.39 * sin(time * 1.94);
	float n2 = 0.59 + 0.68 * cos(time * 0.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.53;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	float cc = clamp(0.5 + 0.5 * v * 1.86 + sr * 1.55, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.27, 0.16), vec3(0.73, 0.72, 0.81), cc);
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
