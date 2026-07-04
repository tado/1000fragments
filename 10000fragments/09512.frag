uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.75 + 0.23 * sin(time * 1.98);
	float n2 = 1.58 + 0.45 * cos(time * 1.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	float cc = clamp(0.5 + 0.5 * v * 1.77 + sr * 1.38, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.27, 0.32), vec3(0.94, 0.57, 0.90), cc);
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.65;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
