uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.66 + 0.35 * sin(time * 0.78);
	float n2 = 2.02 + 0.31 * cos(time * 0.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.79, 0.62, 0.27) * (0.13 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
