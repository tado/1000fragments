uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	vec3 col = vec3(0.006, 0.030, 0.022);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.05 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 1.09 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.50;
		vec2 bq = abs(p - q) - vec2(0.24, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.97 + time * 0.53)) * (0.017 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
