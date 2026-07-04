uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.015, 0.036, 0.018);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.58 + time * 0.81), sin(fi * 0.58 + time * 0.81)) * (0.46 + 0.24 * sin(fi * 1.7 + time * 1.06));
		vec2 bq = abs(p - q) - vec2(0.18, 0.05);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.97 + time * 0.94)) * (0.025 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
