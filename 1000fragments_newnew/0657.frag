uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.69 + 0.14 * sin((time * 0.63) * 1.42);
	float n2 = 0.77 + 0.37 * cos((time * 0.63) * 1.04);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.55, 0.61, 0.57) + vec3(0.02, 0.07, 0.01);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.954, 0.994) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
