uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.011, 0.049, 0.080), vec3(0.010, 0.079, 0.099), clamp(0.5 + p.y * 0.07 + p.x * -0.16, 0.0, 1.0));
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.53;
		float w = 0.16 * sin(p.x * 4.84 + (time * 0.59) * 3.34 + fl * 0.43);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.023, 5.119, 6.215) + fl * 0.57 + (time * 0.59) * 0.30)) * (0.0029 / (ld + 0.0066));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.968, 1.005, 0.957);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
