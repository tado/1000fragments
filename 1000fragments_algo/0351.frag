uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	vec3 col = vec3(0.021, 0.033, 0.059);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.56) * 1.00 * (0.3 + fi * 0.18) + fi * 2.4), cos((time * 0.56) * 1.18 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.46;
		vec2 bq = abs(p - q) - vec2(0.12, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.50, 0.99) + fi * 1.40 + (time * 0.56) * 1.49)) * (0.021 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.962, 1.021) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
