uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.20;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.82 + 0.33 * sin((time * 0.74) * 1.86);
	float n2 = 1.96 + 0.72 * cos((time * 0.74) * 1.03);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.58, 0.67, 0.54) + vec3(0.06, 0.04, 0.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.970, 0.995, 0.958) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
