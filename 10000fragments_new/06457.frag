uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	vec3 col = vec3(0.017, 0.044, 0.069);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.02 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.88 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.74;
		vec2 bq = abs(p - q) - vec2(0.07, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.66 + time * 0.44)) * (0.011 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.80 + time * 14.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
