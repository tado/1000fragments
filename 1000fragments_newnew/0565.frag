uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.47 + 0.77 * sin((time * 0.52) * 1.50);
	float n2 = 0.85 + 0.82 * cos((time * 0.52) * 0.63);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.24 + sr * 0.58), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.09, 0.14), vec3(0.64, 0.76, 0.65), cc);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.74;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.988, 0.916) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
