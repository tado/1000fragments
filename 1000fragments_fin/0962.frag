uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.077, 0.044, 0.033), vec3(0.110, 0.038, 0.045), clamp(0.5 + p.y * 0.28 + p.x * -0.28, 0.0, 1.0));
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 1.46;
		float w = 0.15 * sin(p.x * 6.00 + (time * 0.87) * 1.15 + fl * 0.69) * exp(-p.x * p.x * 1.35);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.814, 7.562, 9.310) + fl * 0.50 + (time * 0.87) * 0.65)) * (0.0055 / (ld + 0.0072));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.026, 0.947, 1.018);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
