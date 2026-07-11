uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.97) * p;
	vec3 col = vec3(0.007, 0.014, 0.033);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.91 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 1.02 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.49;
		vec2 bq = abs(p - q) - vec2(0.23, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.67 + time * 1.08)) * (0.022 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
