uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.54 + 0.51 * sin(time * 0.65);
	float n2 = 2.35 + 0.32 * cos(time * 0.56);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = sin(d * 28.12 - time * 2.85);
	vec3 col = vec3(0.40, 0.69, 0.18) * (0.15 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
