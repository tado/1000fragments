uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.29;
	vec3 col = mix(vec3(0.062, 0.052, 0.036), vec3(0.050, 0.062, 0.028), clamp(0.5 + p.y * -0.49 + p.x * -0.05, 0.0, 1.0));
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.95;
		float w = 0.20 * sin(p.x * 5.04 + (time * 0.76) * 1.63 + fl * 1.58) * exp(-p.x * p.x * 2.45);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.153, 5.059, 5.964) + fl * 0.33 + (time * 0.76) * 0.61)) * (0.0049 / (ld + 0.0116));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.019, 0.991, 0.959);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
