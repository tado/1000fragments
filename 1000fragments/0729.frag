uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.55 + 0.78 * sin(time * 1.18);
	float n2 = 2.16 + 0.30 * cos(time * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.48;
	float d = sr - rr;
	float v = sin(d * 11.86 - time * 3.72);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.72 + time * 0.03);
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
