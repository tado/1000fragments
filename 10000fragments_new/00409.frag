uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	vec3 col = vec3(0.053, 0.004, 0.064);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.63 + time * 0.91), sin(fi * 1.63 + time * 0.91)) * (0.37 + 0.31 * sin(fi * 1.7 + time * 1.72));
		vec2 bq = abs(p - q) - vec2(0.09, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.32 + time * 0.38)) * (0.020 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 0.90 + time * 7.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
