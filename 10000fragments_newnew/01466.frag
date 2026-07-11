uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	vec3 col = vec3(0.002, 0.008, 0.068);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.99 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.06 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.98;
		vec2 bq = abs(p - q) - vec2(0.20, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.06 + time * 0.98)) * (0.034 / (gd + 0.022));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
