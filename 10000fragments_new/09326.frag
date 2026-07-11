uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.80;
	vec3 col = vec3(0.039, 0.053, 0.032);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.29 * (0.3 + fi * 0.17) + fi * 2.4), cos(time * 0.89 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.90;
		vec2 bq = abs(p - q) - vec2(0.16, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.61 + time * 1.02)) * (0.031 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
