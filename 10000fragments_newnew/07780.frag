uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.40) * p;
	vec3 col = vec3(0.047, 0.047, 0.025);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.75 * (0.3 + fi * 0.24) + fi * 2.4), cos(time * 0.44 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.51;
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.11 + time * 0.65)) * (0.017 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 2.95 + time * 7.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
