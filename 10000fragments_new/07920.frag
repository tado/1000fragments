uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	vec3 col = vec3(0.021, 0.056, 0.028);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.34 + time * 1.16), sin(fi * 2.34 + time * 1.16)) * (0.30 + 0.33 * sin(fi * 1.7 + time * 0.75));
		vec2 bq = abs(p - q) - vec2(0.12, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.98 + time * 1.46)) * (0.038 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
