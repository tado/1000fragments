uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.73;
	p = p.yx;
	vec3 col = vec3(0.021, 0.006, 0.037);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.62 + (time * 0.77) * 0.70), sin(fi * 0.62 + (time * 0.77) * 0.70)) * (0.58 + 0.16 * sin(fi * 1.7 + (time * 0.77) * 1.19));
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.23, 2.46) + fi * 1.47 + (time * 0.77) * 0.72)) * (0.037 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.996, 0.927) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
