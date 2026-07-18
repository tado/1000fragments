uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = mix(vec3(0.016, 0.025, 0.052), vec3(0.005, 0.030, 0.056), clamp(0.5 + p.y * -0.49 + p.x * 0.16, 0.0, 1.0));
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.94;
		float w = 0.27 * sin(p.x * 9.00 + (time * 0.61) * 4.70 + fl * 0.81) * exp(-p.x * p.x * 1.98);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.798, 4.882, 6.965) + fl * 0.87 + (time * 0.61) * 0.65)) * (0.0037 / (ld + 0.0132));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.991, 0.994, 1.009);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
