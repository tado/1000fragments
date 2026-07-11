uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.046, 0.052, 0.066);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.51) * 0.52 * (0.3 + fi * 0.07) + fi * 2.4), cos((time * 0.51) * 0.62 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.55;
		vec2 bq = abs(p - q) - vec2(0.06, 0.17);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.10) + fi * 1.95 + (time * 0.51) * 0.59)) * (0.022 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 0.999, 0.930) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
