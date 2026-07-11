uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.84;
	vec3 col = vec3(0.008, 0.039, 0.047);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.90 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 1.05 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.59;
		vec2 bq = abs(p - q) - vec2(0.21, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.66 + time * 0.87)) * (0.033 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
