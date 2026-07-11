uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.053, 0.032, 0.040);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.14 + time * 1.07), sin(fi * 2.14 + time * 1.07)) * (0.63 + 0.26 * sin(fi * 1.7 + time * 1.04));
		vec2 bq = abs(p - q) - vec2(0.22, 0.17);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.89 + time * 1.02)) * (0.028 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
