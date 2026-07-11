uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.85 + 0.44 * sin((time * 0.60) * 1.08);
	float n2 = 0.61 + 0.72 * cos((time * 0.60) * 0.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = sin(d * 10.88 - (time * 0.60) * 3.12);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.71, 0.57, 0.66) + vec3(0.06, 0.05, 0.07);
	col *= 0.86 + 0.10 * sin(gl_FragCoord.y * 2.67 + (time * 0.60) * 14.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.989, 0.913) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
