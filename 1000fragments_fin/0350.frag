uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.72) * 0.51), cos((time * 0.72) * 0.33)) * 0.07;
	p *= 2.42;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 6.49 - (time * 0.72) * 4.76);
		col += fw * (0.5 + 0.5 * cos(vec3(1.274, 2.141, 3.009) + pv * 3.25 + float(zi) * 1.01 + (time * 0.72) * 0.53));
		q = rot2(0.59) * q * 1.59 + vec2(0.02, -0.29);
		fw *= 0.70;
	}
	col *= 0.34;
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.029, 0.979, 0.939);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
