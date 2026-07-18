uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 1.38;
	vec3 col = mix(vec3(0.050, 0.048, 0.064), vec3(0.050, 0.036, 0.087), clamp(0.5 + p.y * 0.49 + p.x * -0.12, 0.0, 1.0));
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.29 + (time * 0.60) * 1.90), sin(fi * 2.29 + (time * 0.60) * 1.90)) * (0.38 + 0.25 * sin(fi * 1.7 + (time * 0.60) * 0.67));
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(3.064, 4.369, 5.673) + fi * 1.51 + (time * 0.60) * 0.91)) * (0.013 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.930, 0.976, 1.047);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
