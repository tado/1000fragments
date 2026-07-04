uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.78 + 0.18 * sin(time * 1.32);
	float n2 = 1.88 + 0.70 * cos(time * 1.72);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.65;
	float d = sr - rr;
	float v = sin(d * 18.23 - time * 3.35);
	vec3 col = vec3(0.84, 0.41, 0.74) * (0.11 / (abs(v) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
