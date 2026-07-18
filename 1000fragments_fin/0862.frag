uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.57) * 0.31), cos((time * 0.57) * 0.41)) * 0.20;
	p *= 1.13;
	p = rot2((time * 0.57) * -0.42) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.44 + 0.54 * sin((time * 0.57) * 1.23);
	float n2 = 2.26 + 0.40 * cos((time * 0.57) * 1.44);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = sin(d * 16.92 - (time * 0.57) * 1.71);
	vec3 col = vec3(0.639, 0.864, 1.000) * (0.10 / (abs((v)) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.949, 0.992, 1.047);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
