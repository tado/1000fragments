uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.024, 0.057, 0.060);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.17 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 0.56 * (0.4 + fi * 0.14) + fi * 1.7)) * 0.75;
		float gd = abs(length(p - q) - 0.24);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.70 + time * 1.06)) * (0.020 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
