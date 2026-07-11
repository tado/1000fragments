uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.37;
	p *= 1.18;
	p = rot2((time * 0.67) * -1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.72 + 0.33 * sin((time * 0.67) * 1.41);
	float n2 = 0.81 + 0.31 * cos((time * 0.67) * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = vec3(0.5 + 0.5 * (v * 1.87 + sr * 1.39)) * vec3(0.55, 0.57, 0.59) + vec3(0.07, 0.10, 0.07);
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.77;
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.982, 1.018) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
