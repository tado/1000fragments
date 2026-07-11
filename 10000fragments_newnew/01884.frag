uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * 1.00) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.57 + 0.75 * sin(time * 0.50);
	float n2 = 0.95 + 0.41 * cos(time * 1.33);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.87, 0.56, 1.03) + vec3(0.07, 0.01, 0.24);
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
