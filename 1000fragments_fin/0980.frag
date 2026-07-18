uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.048, 0.029, 0.092), vec3(0.037, 0.055, 0.133), clamp(0.5 + p.y * -0.15 + p.x * -0.10, 0.0, 1.0));
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.42;
		float w = 0.15 * sin(p.x * 4.09 + (time * 0.83) * 4.08 + fl * 0.73);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(3.633, 5.445, 7.257) + fl * 0.94 + (time * 0.83) * 0.30)) * (0.0053 / (ld + 0.0073));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.926, 0.995, 1.031);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
