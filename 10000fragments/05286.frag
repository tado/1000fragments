uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.86 + 0.29 * sin(time * 0.89);
	float n2 = 1.99 + 0.48 * cos(time * 1.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = d;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.05 + time * 0.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
