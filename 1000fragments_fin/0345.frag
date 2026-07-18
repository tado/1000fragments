uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p *= 1.04;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 9.73 - (time * 0.77) * 3.83);
		col += fw * (0.5 + 0.5 * cos(vec3(4.242, 5.484, 6.727) + pv * 2.44 + float(zi) * 1.28 + (time * 0.77) * 0.40));
		q = rot2(1.05) * q * 0.81 + vec2(0.25, -0.19);
		fw *= 0.74;
	}
	col *= 0.36;
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.002, 0.973, 1.009);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
