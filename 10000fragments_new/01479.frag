uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	vec3 col = vec3(0.007, 0.056, 0.048);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.95 + time * 1.67), sin(fi * 0.95 + time * 1.67)) * (0.40 + 0.30 * sin(fi * 1.7 + time * 1.62));
		vec2 bq = abs(p - q) - vec2(0.06, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.04 + time * 1.19)) * (0.036 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
