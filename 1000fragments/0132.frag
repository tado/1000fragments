uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.24 + 0.42 * sin(time * 1.67);
	float n2 = 1.74 + 0.49 * cos(time * 1.20);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.51, 0.38, 0.37) * (0.20 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
