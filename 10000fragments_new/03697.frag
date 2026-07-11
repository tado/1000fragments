uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	vec3 col = vec3(0.041, 0.035, 0.002);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.30 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 0.99 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.41;
		vec2 bq = abs(p - q) - vec2(0.11, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.42 + time * 1.47)) * (0.032 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
