uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	vec3 col = vec3(0.037, 0.016, 0.050);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.58) * 1.50 * (0.3 + fi * 0.24) + fi * 2.4), cos((time * 0.58) * 1.18 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.50;
		vec2 bq = abs(p - q) - vec2(0.16, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.98, 1.96) + fi * 0.81 + (time * 0.58) * 0.65)) * (0.014 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 1.001, 1.016) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
