uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.27 + 0.69 * sin(time * 0.51);
	float n2 = 1.60 + 0.47 * cos(time * 1.42);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	float cc = clamp(0.5 + 0.5 * v * 1.74 + sr * 1.19, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.28, 0.36), vec3(0.95, 0.63, 0.53), cc);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.90;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
