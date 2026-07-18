uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.73) * 1.15), cos((time * 0.73) * 0.52)) * 0.24;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 7.77;
		float pv = sin(gq.x + (time * 0.73) * 2.13) * sin(gq.y - (time * 0.73) * 2.07);
		col += fw * (0.5 + 0.5 * cos(vec3(1.776, 2.523, 3.269) + pv * 2.37 + float(zi) * 0.85 + (time * 0.73) * 0.00));
		q = rot2(0.96) * q * 0.56 + vec2(0.08, 0.08);
		fw *= 0.69;
	}
	col *= 0.37;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.012, 0.971, 0.960);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
