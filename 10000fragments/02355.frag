uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.59 + 0.40 * sin(time * 0.62);
	float n2 = 1.22 + 0.21 * cos(time * 0.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = sin(d * 15.30 - time * 4.82);
	vec3 col = vec3(0.17, 0.98, 0.19) * (0.17 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
