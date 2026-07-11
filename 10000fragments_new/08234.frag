uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	vec3 col = vec3(0.048, 0.002, 0.025);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.01 + time * 0.75), sin(fi * 1.01 + time * 0.75)) * (0.71 + 0.25 * sin(fi * 1.7 + time * 0.92));
		vec2 bq = abs(p - q) - vec2(0.20, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.66 + time * 0.90)) * (0.033 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
