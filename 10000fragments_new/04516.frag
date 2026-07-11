uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.050, 0.022, 0.032);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.94 + time * 1.02), sin(fi * 0.94 + time * 1.02)) * (0.50 + 0.38 * sin(fi * 1.7 + time * 1.28));
		vec2 bq = abs(p - q) - vec2(0.19, 0.17);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.77 + time * 0.79)) * (0.013 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
