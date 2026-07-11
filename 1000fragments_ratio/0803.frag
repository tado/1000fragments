uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.99;
	p *= 1.38;
	p = rot2((time * 0.53) * -0.78) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.76 + 0.34 * sin((time * 0.53) * 1.42);
	float n2 = 0.95 + 0.55 * cos((time * 0.53) * 1.36);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.69;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.60, 0.63, 0.71) * (0.11 / (abs((v)) + 0.04));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.952, 1.029) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
