uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	vec3 col = vec3(0.031, 0.006, 0.064);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.77 + (time * 0.66) * 1.31), sin(fi * 0.77 + (time * 0.66) * 1.31)) * (0.39 + 0.11 * sin(fi * 1.7 + (time * 0.66) * 0.85));
		vec2 bq = abs(p - q) - vec2(0.10, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.09) + fi * 1.22 + (time * 0.66) * 1.45)) * (0.024 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.00 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 1.019, 0.956) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
