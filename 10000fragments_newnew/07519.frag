uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = rot2(time * 0.69) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.77 + 0.12 * sin(time * 0.87);
	float n2 = 0.57 + 0.93 * cos(time * 1.01);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.79 + sr * 1.14 * 1.80 + time * 0.55);
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.87;
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
