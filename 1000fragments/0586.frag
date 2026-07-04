uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.95 + 0.69 * sin(time * 1.22);
	float n2 = 1.75 + 0.49 * cos(time * 1.18);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = vec3(0.68, 0.37, 0.80) * (0.07 / (abs(v * 1.58 + sr * 1.49) + 0.09));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.77;
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
