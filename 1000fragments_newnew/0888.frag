uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	p = rot2((time * 0.79) * -0.41) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.89 + 0.18 * sin((time * 0.79) * 1.03);
	float n2 = 0.79 + 0.42 * cos((time * 0.79) * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = sin(d * 14.92 - (time * 0.79) * 1.72);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.64, 0.55, 0.70) + vec3(0.10, 0.09, 0.11);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 0.990, 0.931) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
