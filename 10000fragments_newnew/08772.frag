uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.86 + 0.73 * sin(time * 1.36);
	float n2 = 2.48 + 0.50 * cos(time * 1.38);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.90;
	float d = sr - rr;
	float v = sin(d * 23.49 - time * 5.60);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.27, 0.55), vec3(0.97, 0.77, 0.82), cc);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 0.91 + time * 8.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
