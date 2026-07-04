uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	vec3 col = vec3(0.038, 0.049, 0.069);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.33 + time * 1.04), sin(fi * 2.33 + time * 1.04)) * (0.52 + 0.30 * sin(fi * 1.7 + time * 0.51));
		vec2 bq = abs(p - q) - vec2(0.13, 0.14);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.68 + time * 0.43)) * (0.015 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
