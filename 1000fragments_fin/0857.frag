uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.12 + (time * 0.78) * 0.90) * 0.08;
	p.y = abs(p.y) - 0.47;
	p *= 0.96;
	p = rot2((time * 0.78) * -1.44) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.51 + 0.20 * sin((time * 0.78) * 1.22);
	float n2 = 2.45 + 0.43 * cos((time * 0.78) * 1.23);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = sin(d * 15.89 - (time * 0.78) * 1.70);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.020, 0.066, 0.103), vec3(0.751, 0.730, 0.959), smoothstep(0.0, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.003, 0.956, 1.011);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
