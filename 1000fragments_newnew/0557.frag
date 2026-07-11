uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2((time * 0.59) * 1.24) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.10 + 0.80 * sin((time * 0.59) * 1.82);
	float n2 = 1.34 + 0.81 * cos((time * 0.59) * 1.17);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	vec3 col = vec3(0.67, 0.65, 0.74) * (0.06 / (abs((v * 2.12 + sr * 1.31)) + 0.09));
	col = col / (1.0 + col);
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.69;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.053, 0.990, 0.912) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
