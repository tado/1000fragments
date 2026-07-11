uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.38) * p;
	vec3 col = vec3(0.028, 0.025, 0.071);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.32 * (0.3 + fi * 0.07) + fi * 2.4), cos(time * 0.75 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.41;
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.50 + time * 0.69)) * (0.010 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 2.94 + time * 13.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
