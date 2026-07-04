uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.90 + 0.10 * sin(time * 0.87);
	float n2 = 1.13 + 0.69 * cos(time * 1.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.90;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.75, 0.34, 0.83) * (0.24 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
