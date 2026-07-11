uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	p = rot2(time * -1.07) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.51 + 0.68 * sin(time * 1.36);
	float n2 = 2.00 + 0.84 * cos(time * 1.01);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.40, 0.81, 0.37) * (0.06 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
