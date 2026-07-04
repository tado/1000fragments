uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.36 + 0.18 * sin(time * 1.62);
	float n2 = 1.22 + 0.27 * cos(time * 0.48);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.33 + sr * 0.73 * 4.25 + time * 0.79);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
