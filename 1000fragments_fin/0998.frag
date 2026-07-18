uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.12 + (time * 0.76) * 0.65) * 0.15;
	vec3 col = mix(vec3(0.018, 0.037, 0.082), vec3(0.029, 0.052, 0.082), clamp(0.5 + p.y * -0.55 + p.x * -0.29, 0.0, 1.0));
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.88;
		float w = 0.11 * sin(p.x * 5.94 + (time * 0.76) * 3.90 + fl * 1.20);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.373, 2.559, 3.746) + fl * 0.54 + (time * 0.76) * 0.40)) * (0.0068 / (ld + 0.0121));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.025, 0.999, 0.950);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
