uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.41;
	vec3 col = vec3(0.003, 0.030, 0.032);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 2.19;
		float w = 0.18 * sin(p.x * 5.10 + (time * 0.82) * 4.04 + fl * 0.56);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.794, 3.152, 4.511) + fl * 1.16 + (time * 0.82) * 0.47)) * (0.0045 / (ld + 0.0081));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.035, 0.992, 0.945);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
