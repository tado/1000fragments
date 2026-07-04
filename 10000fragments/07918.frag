uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.34 + 0.19 * sin(time * 1.76);
	float n2 = 2.34 + 0.99 * cos(time * 1.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = sin(d * 15.52 - time * 4.65);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.35, 0.30), vec3(0.95, 0.85, 0.49), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
