uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 4.42 - (time * 0.59) * 3.08);
		col += fw * (0.5 + 0.5 * cos(vec3(1.635, 2.658, 3.680) + pv * 1.87 + float(zi) * 0.63 + (time * 0.59) * 0.31));
		q = rot2(0.56) * q * 0.59 + vec2(-0.11, -0.25);
		fw *= 0.72;
	}
	col *= 0.35;
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 0.99 + (time * 0.59) * 9.49);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.018, 0.946, 1.022);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
