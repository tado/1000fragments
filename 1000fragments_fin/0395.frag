uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.29;
	vec3 col = mix(vec3(0.065, 0.048, 0.034), vec3(0.038, 0.025, 0.047), clamp(0.5 + p.y * 0.44 + p.x * 0.20, 0.0, 1.0));
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.25 + (time * 0.68) * 1.88), sin(fi * 2.25 + (time * 0.68) * 1.88)) * (0.61 + 0.21 * sin(fi * 1.7 + (time * 0.68) * 1.31));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(3.951, 4.850, 5.748) + fi * 1.46 + (time * 0.68) * 0.31)) * (0.034 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.004, 1.001, 1.002);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
