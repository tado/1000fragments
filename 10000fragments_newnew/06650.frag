uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.65 + 0.50 * sin(time * 0.60);
	float n2 = 1.63 + 0.62 * cos(time * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	float cc = clamp(0.5 + 0.5 * v * 1.75 + sr * 1.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.00, 0.35), vec3(0.58, 0.59, 0.60), cc);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.69;
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
