uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.94 + 0.74 * sin(time * 1.32);
	float n2 = 2.46 + 0.37 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = vec3(0.5 + 0.5 * v * 1.46 + sr * 0.58) * vec3(1.42, 0.69, 1.30) + vec3(0.17, 0.06, 0.20);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.65;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
