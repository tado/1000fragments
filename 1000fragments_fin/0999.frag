uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.28 + (time * 0.71) * 1.04) * 0.19;
	vec3 col = mix(vec3(0.045, 0.049, 0.093), vec3(0.032, 0.032, 0.136), clamp(0.5 + p.y * -0.10 + p.x * 0.28, 0.0, 1.0));
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 1.82;
		float w = 0.11 * sin(p.x * 2.12 + (time * 0.71) * 3.54 + fl * 0.92);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.319, 1.664, 3.009) + fl * 1.16 + (time * 0.71) * 0.81)) * (0.0031 / (ld + 0.0109));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.007, 0.946, 1.006);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
