uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.09 + (time * 0.84) * 1.18) * 0.13;
	p *= 2.40;
	vec3 col = vec3(0.024, 0.056, 0.078);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.84) * 1.40 * (0.3 + fi * 0.23) + fi * 2.4), cos((time * 0.84) * 1.46 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.56;
		vec2 bq = abs(p - q) - vec2(0.24, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.63, 1.27) + fi * 0.58 + (time * 0.84) * 1.01)) * (0.040 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.02 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.977, 1.042) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
