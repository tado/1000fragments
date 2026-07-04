uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * -1.39) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.55 + 0.15 * sin(time * 1.96);
	float n2 = 2.48 + 0.90 * cos(time * 1.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = vec3(0.43, 0.92, 0.65) * (0.09 / (abs(v * 1.66 + sr * 1.71) + 0.07));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
