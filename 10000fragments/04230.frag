uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.82 + 0.52 * sin(time * 1.49);
	float n2 = 1.91 + 0.89 * cos(time * 1.05);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = sin(d * 22.00 - time * 3.53);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.35, 0.31), vec3(0.78, 0.67, 0.79), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
