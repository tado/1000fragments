uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	vec3 col = vec3(0.019, 0.023, 0.027);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.96 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 1.09 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.57;
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.72 + time * 0.69)) * (0.034 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
