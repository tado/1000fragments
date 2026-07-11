uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	vec3 col = vec3(0.019, 0.018, 0.065);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.67) * 0.96 * (0.3 + fi * 0.14) + fi * 2.4), cos((time * 0.67) * 0.94 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.98;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.28) + fi * 1.32 + (time * 0.67) * 0.76)) * (0.029 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.979, 0.926) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
