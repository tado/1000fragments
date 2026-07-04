uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * -0.85) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.52 + 0.21 * sin(time * 1.86);
	float n2 = 1.11 + 0.86 * cos(time * 1.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = vec3(0.87, 0.53, 0.93) * (0.13 / (abs(v * 2.47 + sr * 1.80) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.70;
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
