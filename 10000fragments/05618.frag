uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.82 + 0.63 * sin(time * 0.93);
	float n2 = 1.54 + 0.75 * cos(time * 1.79);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = vec3(0.35, 0.62, 0.44) * (0.10 / (abs(v * 1.02 + sr * 1.63) + 0.04));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
