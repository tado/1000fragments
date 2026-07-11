uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec3 col = vec3(0.031, 0.010, 0.029);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.85 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.26 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.60;
		vec2 bq = abs(p - q) - vec2(0.08, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.32 + time * 0.25)) * (0.030 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
