uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	vec3 col = vec3(0.019, 0.042, 0.001);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.95 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.47 * (0.4 + fi * 0.09) + fi * 1.7)) * 0.56;
		vec2 bq = abs(p - q) - vec2(0.10, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.60 + time * 0.69)) * (0.035 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
