uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.32) * p;
	vec3 col = vec3(0.041, 0.054, 0.049);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.66 + time * 0.86), sin(fi * 0.66 + time * 0.86)) * (0.51 + 0.28 * sin(fi * 1.7 + time * 1.96));
		vec2 bq = abs(p - q) - vec2(0.09, 0.05);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.90 + time * 0.79)) * (0.016 / (gd + 0.012));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
