uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	vec3 col = vec3(0.047, 0.050, 0.072);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.84 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 1.27 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.56;
		vec2 bq = abs(p - q) - vec2(0.24, 0.19);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.86 + time * 1.44)) * (0.030 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
