uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y = abs(p.y);
	p.x = abs(p.x) - 0.23;
	p *= 1.04;
	vec3 col = mix(vec3(0.024, 0.051, 0.061), vec3(0.029, 0.057, 0.048), clamp(0.5 + p.y * -0.40 + p.x * 0.17, 0.0, 1.0));
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.60 + (time * 0.72) * 1.73), sin(fi * 1.60 + (time * 0.72) * 1.73)) * (0.67 + 0.14 * sin(fi * 1.7 + (time * 0.72) * 0.62));
		vec2 bq = abs(p - q) - vec2(0.23, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(3.648, 4.402, 5.156) + fi * 1.36 + (time * 0.72) * 0.73)) * (0.024 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.015, 0.990, 0.956);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
