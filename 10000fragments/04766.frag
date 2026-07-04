uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.33 + 0.78 * sin(time * 0.50);
	float n2 = 0.77 + 0.78 * cos(time * 1.33);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = vec3(0.28, 0.19, 0.40) * (0.10 / (abs(v * 1.28 + sr * 1.22) + 0.03));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.13, d) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
