uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -0.90) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.53 + 0.53 * sin(time * 0.99);
	float n2 = 1.10 + 0.33 * cos(time * 1.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = sin(d * 21.25 - time * 4.72);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.27, 1.05, 1.34) + vec3(0.11, 0.19, 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
