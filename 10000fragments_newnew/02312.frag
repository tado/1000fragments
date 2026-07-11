uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.003, 0.037, 0.072);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.13 + time * 2.11), sin(fi * 2.13 + time * 2.11)) * (0.58 + 0.16 * sin(fi * 1.7 + time * 0.50));
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.64 + time * 0.33)) * (0.010 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
