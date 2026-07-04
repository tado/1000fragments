uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.032, 0.014);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.32 + time * 1.05), sin(fi * 2.32 + time * 1.05)) * (0.54 + 0.29 * sin(fi * 1.7 + time * 1.85));
		vec2 bq = abs(p - q) - vec2(0.19, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.46 + time * 1.12)) * (0.036 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
