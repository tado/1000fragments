uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec3 col = vec3(0.021, 0.030, 0.010);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.68 + time * 2.28), sin(fi * 1.68 + time * 2.28)) * (0.31 + 0.25 * sin(fi * 1.7 + time * 1.74));
		vec2 bq = abs(p - q) - vec2(0.09, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.43 + time * 0.72)) * (0.040 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
