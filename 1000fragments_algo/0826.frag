uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.49 + (time * 0.79) * 1.26) * 0.15;
	p *= 1.35;
	p *= 1.19;
	p = rot2((time * 0.79) * -0.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.49 + 0.69 * sin((time * 0.79) * 0.97);
	float n2 = 0.53 + 0.42 * cos((time * 0.79) * 1.18);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.51;
	float d = sr - rr;
	float v = sin(d * 11.68 - (time * 0.79) * 3.01);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.11, 0.05), vec3(0.68, 0.63, 0.67), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.978, 0.942) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
