uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	vec3 col = vec3(0.057, 0.005, 0.057);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.40 + time * 1.76), sin(fi * 1.40 + time * 1.76)) * (0.63 + 0.15 * sin(fi * 1.7 + time * 1.63));
		vec2 bq = abs(p - q) - vec2(0.21, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.88 + time * 1.22)) * (0.038 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
