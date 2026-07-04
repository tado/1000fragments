uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.40 + 0.35 * sin(time * 1.56);
	float n2 = 1.54 + 0.75 * cos(time * 1.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = d;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.03 + time * 0.30);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 2.65 + time * 4.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
