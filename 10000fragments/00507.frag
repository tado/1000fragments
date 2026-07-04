uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.07 + 0.23 * sin(time * 1.17);
	float n2 = 1.20 + 0.82 * cos(time * 1.70);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = sin(d * 21.21 - time * 1.11);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.58 + time * 0.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
