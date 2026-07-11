uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.63 + (time * 0.81) * 1.12) * 0.08;
	p += vec2(sin((time * 0.81) * 0.50), cos((time * 0.81) * 0.49)) * 0.17;
	p *= 1.12;
	p = rot2((time * 0.81) * 0.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.64 + 0.32 * sin((time * 0.81) * 1.58);
	float n2 = 2.49 + 0.66 * cos((time * 0.81) * 0.87);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = sin(d * 28.48 - (time * 0.81) * 4.89);
	vec3 col = vec3(0.73, 0.72, 0.57) * (0.09 / (abs((v)) + 0.08));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.987, 0.991) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
