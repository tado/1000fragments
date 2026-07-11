uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	vec3 col = vec3(0.049, 0.024, 0.000);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.36 + time * 2.10), sin(fi * 2.36 + time * 2.10)) * (0.38 + 0.24 * sin(fi * 1.7 + time * 0.54));
		vec2 bq = abs(p - q) - vec2(0.08, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.71 + time * 1.15)) * (0.018 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
