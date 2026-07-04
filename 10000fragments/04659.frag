uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.59 + 0.35 * sin(time * 1.05);
	float n2 = 0.90 + 0.74 * cos(time * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.22, 0.25), vec3(0.94, 0.67, 0.76), cc);
	col *= 0.80 + 0.20 * sin(gl_FragCoord.y * 2.34 + time * 6.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
