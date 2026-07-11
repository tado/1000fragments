uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.028, 0.009, 0.046);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.01 + time * 2.17), sin(fi * 1.01 + time * 2.17)) * (0.68 + 0.13 * sin(fi * 1.7 + time * 1.02));
		vec2 bq = abs(p - q) - vec2(0.22, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.84 + time * 0.67)) * (0.016 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
