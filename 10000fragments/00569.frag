uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.11 + 0.11 * sin(time * 0.79);
	float n2 = 1.09 + 0.64 * cos(time * 0.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.15, d);

	vec3 col = vec3(0.61, 0.78, 0.97) * (0.20 / (abs(v * 1.17 + sr * 1.41) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
