uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.67 + 0.40 * sin(time * 1.72);
	float n2 = 1.18 + 0.32 * cos(time * 0.92);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.11, 0.93, 0.67) + vec3(0.21, 0.12, 0.17);
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
