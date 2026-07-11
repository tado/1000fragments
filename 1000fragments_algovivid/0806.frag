uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.82) * 0.35), cos((time * 0.82) * 0.99)) * 0.24;
	p *= 1.38;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.22 + 0.40 * sin((time * 0.82) * 1.55);
	float n2 = 2.40 + 0.56 * cos((time * 0.82) * 0.79);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.82;
	float d = sr - rr;
	float v = sin(d * 22.85 - (time * 0.82) * 1.24);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.48, 0.53, 0.43) + vec3(0.07, 0.04, 0.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.954, 0.995) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
