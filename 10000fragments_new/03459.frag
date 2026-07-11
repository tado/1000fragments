uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	vec3 col = vec3(0.054, 0.021, 0.052);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.12 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 1.26 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.50;
		vec2 bq = abs(p - q) - vec2(0.22, 0.06);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.73 + time * 0.79)) * (0.020 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
