uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.59 + 0.45 * sin((time * 0.54) * 1.34);
	float n2 = 1.55 + 0.82 * cos((time * 0.54) * 0.42);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.61 + sr * 1.69), 0.0, 1.0);
	vec3 col = mix(vec3(0.84, 0.71, 0.76), vec3(0.12, 0.14, 0.07), cc);
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.90;
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.986, 1.033) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
