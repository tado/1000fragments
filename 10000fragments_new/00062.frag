uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	vec3 col = vec3(0.032, 0.048, 0.076);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.47 + time * 1.48), sin(fi * 2.47 + time * 1.48)) * (0.77 + 0.32 * sin(fi * 1.7 + time * 0.77));
		vec2 bq = abs(p - q) - vec2(0.19, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 0.72)) * (0.020 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 1.52 + time * 7.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
