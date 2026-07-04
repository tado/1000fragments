uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * 1.30) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.41 + 0.18 * sin(time * 0.94);
	float n2 = 0.74 + 0.43 * cos(time * 0.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	vec3 col = vec3(0.56, 0.21, 0.54) * (0.11 / (abs(v * 1.96 + sr * 0.86) + 0.10));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.77;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
