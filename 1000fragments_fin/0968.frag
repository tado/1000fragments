uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y = abs(p.y) - 0.36;
	vec3 col = mix(vec3(0.042, 0.044, 0.081), vec3(0.043, 0.030, 0.060), clamp(0.5 + p.y * -0.60 + p.x * -0.24, 0.0, 1.0));
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.85;
		float w = 0.08 * sin(p.x * 5.66 + (time * 0.75) * 3.39 + fl * 0.89);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.747, 5.571, 6.395) + fl * 0.63 + (time * 0.75) * 1.06)) * (0.0060 / (ld + 0.0135));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.960, 1.015, 0.947);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
