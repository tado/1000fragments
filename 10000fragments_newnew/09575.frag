uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.82 + 0.45 * sin(time * 0.75);
	float n2 = 1.75 + 0.22 * cos(time * 0.95);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = vec3(0.92, 0.27, 0.49) * (0.10 / (abs(v * 2.08 + sr * 1.69) + 0.03));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
