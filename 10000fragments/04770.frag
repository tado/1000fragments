uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * -0.98) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.53 + 0.32 * sin(time * 0.55);
	float n2 = 1.29 + 0.87 * cos(time * 0.90);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.42 + sr * 1.31 * 2.45 + time * 0.84);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.90;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
