uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.047, 0.037, 0.030);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.42 + time * 0.73), sin(fi * 2.42 + time * 0.73)) * (0.46 + 0.13 * sin(fi * 1.7 + time * 1.51));
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.94 + time * 0.27)) * (0.035 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 1.37 + time * 14.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
