uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = mix(vec3(0.011, 0.029, 0.061), vec3(0.015, 0.026, 0.038), clamp(0.5 + p.y * 0.16 + p.x * 0.15, 0.0, 1.0));
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.81;
		float w = 0.10 * sin(p.x * 3.69 + (time * 0.78) * 3.14 + fl * 1.38);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.664, 7.488, 9.311) + fl * 0.23 + (time * 0.78) * 1.02)) * (0.0078 / (ld + 0.0092));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.048, 0.985, 0.936);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
