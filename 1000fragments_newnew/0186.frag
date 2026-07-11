uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec3 col = vec3(0.031, 0.020, 0.059);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.60) * 0.66 * (0.3 + fi * 0.10) + fi * 2.4), cos((time * 0.60) * 1.52 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.91;
		vec2 bq = abs(p - q) - vec2(0.18, 0.13);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + fi * 1.99 + (time * 0.60) * 0.67)) * (0.033 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.971, 0.917) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
