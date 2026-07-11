uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec3 col = vec3(0.032, 0.022, 0.014);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.51 * (0.3 + fi * 0.08) + fi * 2.4), cos(time * 1.49 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.43;
		vec2 bq = abs(p - q) - vec2(0.08, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.44 + time * 0.76)) * (0.028 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
