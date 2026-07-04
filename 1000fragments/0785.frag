uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p = rot2(time * 0.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.47 + 0.16 * sin(time * 1.41);
	float n2 = 2.39 + 0.64 * cos(time * 1.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.39, 0.31, 0.78) * (0.20 / (abs(v * 1.29 + sr * 1.91) + 0.08));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.79;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
