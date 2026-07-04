uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.76 + 0.41 * sin(time * 0.70);
	float n2 = 1.29 + 0.78 * cos(time * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.67;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	float cc = clamp(0.5 + 0.5 * v * 1.61 + sr * 1.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.30, 0.14), vec3(0.84, 0.96, 0.88), cc);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.80;
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
