uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.31;
	p *= 1.23;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 2.07;
	vec3 col = vec3(0.013, 0.055, 0.080);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.69) * 0.48 * (0.3 + fi * 0.05) + fi * 2.4), cos((time * 0.69) * 1.46 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.80;
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(1.718, 3.266, 4.813) + fi * 1.75 + (time * 0.69) * 0.59)) * (0.033 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.029, 0.998, 0.935);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
