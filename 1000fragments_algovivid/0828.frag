uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.62) * 0.30), cos((time * 0.62) * 0.43)) * 0.07;
	p *= 1.45;
	p = rot2((time * 0.62) * -0.64) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.84 + 0.43 * sin((time * 0.62) * 1.93);
	float n2 = 1.71 + 0.44 * cos((time * 0.62) * 1.03);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.32 + sr * 1.16), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.11, 0.09), vec3(0.69, 0.77, 0.70), cc);
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.82;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 1.002, 0.937) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
