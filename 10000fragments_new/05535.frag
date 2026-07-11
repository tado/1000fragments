uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.045, 0.032);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.81 + time * 2.04), sin(fi * 1.81 + time * 2.04)) * (0.65 + 0.12 * sin(fi * 1.7 + time * 1.02));
		float gd = abs(length(p - q) - 0.08);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.66 + time * 0.24)) * (0.023 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
