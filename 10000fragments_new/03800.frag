uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = rot2(time * 1.28) * p;
	vec3 col = vec3(0.043, 0.047, 0.050);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.49 + time * 1.41), sin(fi * 2.49 + time * 1.41)) * (0.46 + 0.20 * sin(fi * 1.7 + time * 1.74));
		vec2 bq = abs(p - q) - vec2(0.17, 0.18);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 0.94)) * (0.038 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
