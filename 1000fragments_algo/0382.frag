uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	vec3 col = vec3(0.003, 0.034, 0.072);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.41 + (time * 0.61) * 0.93), sin(fi * 2.41 + (time * 0.61) * 0.93)) * (0.45 + 0.32 * sin(fi * 1.7 + (time * 0.61) * 1.56));
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.09, 2.18) + fi * 1.36 + (time * 0.61) * 0.35)) * (0.009 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.987, 0.987) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
