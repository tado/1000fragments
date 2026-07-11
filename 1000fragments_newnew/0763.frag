uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.056, 0.041, 0.019);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.95 + (time * 0.56) * 2.40), sin(fi * 0.95 + (time * 0.56) * 2.40)) * (0.37 + 0.33 * sin(fi * 1.7 + (time * 0.56) * 1.05));
		vec2 bq = abs(p - q) - vec2(0.15, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.65) + fi * 1.47 + (time * 0.56) * 1.39)) * (0.024 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.963, 1.002) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
