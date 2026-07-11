uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p = rot2((time * 0.54) * -0.62) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 0.68 + 0.36 * sin((time * 0.54) * 1.90);
	float n2 = 1.23 + 0.31 * cos((time * 0.54) * 1.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = sin(d * 10.41 - (time * 0.54) * 1.99);
	vec3 col = vec3(0.53, 0.35, 0.39) * (0.06 / (abs((v)) + 0.09));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.977, 1.012) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
