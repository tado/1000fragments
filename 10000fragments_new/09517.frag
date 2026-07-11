uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.32) * p;
	vec3 col = vec3(0.017, 0.038, 0.020);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.69 + time * 2.15), sin(fi * 1.69 + time * 2.15)) * (0.77 + 0.19 * sin(fi * 1.7 + time * 1.67));
		vec2 bq = abs(p - q) - vec2(0.23, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.72 + time * 0.48)) * (0.030 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
