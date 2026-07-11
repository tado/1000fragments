uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	vec3 col = vec3(0.026, 0.018, 0.028);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.44 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 0.88 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.71;
		vec2 bq = abs(p - q) - vec2(0.05, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.97 + time * 0.93)) * (0.010 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
