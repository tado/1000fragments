uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	vec3 col = vec3(0.006, 0.054, 0.011);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.67 + time * 1.61), sin(fi * 1.67 + time * 1.61)) * (0.40 + 0.18 * sin(fi * 1.7 + time * 0.79));
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.58 + time * 0.62)) * (0.024 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
