uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.39;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 5.0 + length(q) * 6.91 - (time * 0.70) * 3.33);
		col += fw * (0.5 + 0.5 * cos(vec3(0.604, 2.259, 3.914) + pv * 1.51 + float(zi) * 0.76 + (time * 0.70) * 0.55));
		q = rot2(0.75) * q * 1.54 + vec2(-0.07, -0.17);
		fw *= 0.58;
	}
	col *= 0.43;
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.026, 0.948, 1.017);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
