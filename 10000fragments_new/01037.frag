uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec3 col = vec3(0.045, 0.057, 0.020);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.56 + time * 0.56), sin(fi * 0.56 + time * 0.56)) * (0.41 + 0.15 * sin(fi * 1.7 + time * 1.57));
		float gd = abs(length(p - q) - 0.26);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.67 + time * 0.62)) * (0.032 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
