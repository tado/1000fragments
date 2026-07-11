uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.54 + 0.66 * sin((time * 0.70) * 1.23);
	float n2 = 1.20 + 0.78 * cos((time * 0.70) * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.70;
	float d = sr - rr;
	float v = sin(d * 27.32 - (time * 0.70) * 3.15);
	vec3 col = vec3(0.47, 0.35, 0.36) * (0.10 / (abs((v)) + 0.03));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.962, 1.016) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
