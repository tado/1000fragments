uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.038, 0.041, 0.051);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.24 + time * 1.47), sin(fi * 2.24 + time * 1.47)) * (0.30 + 0.34 * sin(fi * 1.7 + time * 1.02));
		vec2 bq = abs(p - q) - vec2(0.05, 0.20);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.96 + time * 0.21)) * (0.040 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
