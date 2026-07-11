uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	vec3 col = vec3(0.040, 0.026, 0.057);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.37 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 1.56 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.53;
		vec2 bq = abs(p - q) - vec2(0.19, 0.19);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.71 + time * 0.38)) * (0.037 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
