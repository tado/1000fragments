uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.75;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	vec3 col = vec3(0.022, 0.004, 0.056);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.73 + (time * 0.72) * 1.30), sin(fi * 0.73 + (time * 0.72) * 1.30)) * (0.76 + 0.16 * sin(fi * 1.7 + (time * 0.72) * 1.10));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.74, 3.49) + fi * 1.52 + (time * 0.72) * 1.18)) * (0.018 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.970, 1.052) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
