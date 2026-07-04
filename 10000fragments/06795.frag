uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.79 + 0.36 * sin(time * 1.87);
	float n2 = 0.78 + 0.56 * cos(time * 0.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.55;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	float cc = clamp(0.5 + 0.5 * v * 1.64 + sr * 0.87, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.40, 0.14), vec3(0.62, 0.97, 0.73), cc);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.85;
	col = mod(col * 2.08, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
