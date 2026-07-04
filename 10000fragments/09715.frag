uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec3 col = vec3(0.060, 0.029, 0.009);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.31 + time * 1.27), sin(fi * 1.31 + time * 1.27)) * (0.73 + 0.12 * sin(fi * 1.7 + time * 1.77));
		float gd = abs(length(p - q) - 0.23);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.80 + time * 1.49)) * (0.011 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
