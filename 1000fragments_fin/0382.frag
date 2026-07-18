uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.22;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 col = mix(vec3(0.041, 0.042, 0.071), vec3(0.040, 0.028, 0.065), clamp(0.5 + p.y * 0.10 + p.x * 0.27, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.62) * 0.48 * (0.3 + fi * 0.21) + fi * 2.4), cos((time * 0.62) * 1.43 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.77;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(4.123, 5.974, 7.824) + fi * 1.85 + (time * 0.62) * 0.40)) * (0.022 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.963, 1.005, 0.931);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
