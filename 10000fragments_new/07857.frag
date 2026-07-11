uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.031, 0.040, 0.004);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.20 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 0.51 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.60;
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.62 + time * 0.81)) * (0.023 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
