uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.99 + 0.16 * sin(time * 0.95);
	float n2 = 1.22 + 0.48 * cos(time * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.40;
	float d = sr - rr;
	float v = sin(d * 20.81 - time * 1.98);
	vec3 col = vec3(0.16, 0.97, 0.89) * (0.20 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
