uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.02;
	p = rot2((time * 0.74) * -0.94) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.97 + 0.48 * sin((time * 0.74) * 1.94);
	float n2 = 2.25 + 0.20 * cos((time * 0.74) * 1.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	float cc = clamp(0.5 + 0.5 * (v * 2.09 + sr * 1.46), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.07, 0.15), vec3(0.59, 0.75, 0.64), cc);
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.67;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.003, 0.942) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
