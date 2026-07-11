uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.046, 0.053, 0.071);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.11 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 0.96 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.88;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.90 + time * 0.88)) * (0.013 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
