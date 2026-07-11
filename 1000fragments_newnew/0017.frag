uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2((time * 0.78) * -1.35) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.62 + 0.75 * sin((time * 0.78) * 1.72);
	float n2 = 1.26 + 0.33 * cos((time * 0.78) * 1.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = sin(d * 14.38 - (time * 0.78) * 2.04);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.49, 0.59, 0.55), vec3(0.11, 0.14, 0.06), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 1.003, 0.927) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
