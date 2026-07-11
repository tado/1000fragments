uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	vec3 col = vec3(0.037, 0.042, 0.048);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.08 + time * 1.09), sin(fi * 1.08 + time * 1.09)) * (0.57 + 0.26 * sin(fi * 1.7 + time * 1.92));
		vec2 bq = abs(p - q) - vec2(0.17, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.48 + time * 0.81)) * (0.033 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
