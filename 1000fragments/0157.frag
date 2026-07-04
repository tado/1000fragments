uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	p = rot2(time * 1.03) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.38 + 0.42 * sin(time * 1.58);
	float n2 = 1.21 + 0.78 * cos(time * 1.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.45 + sr * 1.68 * 2.39 + time * 0.41);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.87;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
