uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = mix(vec3(0.026, 0.070, 0.087), vec3(0.030, 0.085, 0.052), clamp(0.5 + p.y * 0.09 + p.x * 0.02, 0.0, 1.0));
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.78) * 1.23 * (0.3 + fi * 0.06) + fi * 2.4), cos((time * 0.78) * 0.88 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.45;
		vec2 bq = abs(p - q) - vec2(0.19, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(5.304, 6.949, 8.594) + fi * 0.42 + (time * 0.78) * 0.60)) * (0.015 / (gd + 0.047));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.034, 0.999, 0.915);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
