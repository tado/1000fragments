uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec3 col = vec3(0.023, 0.012, 0.054);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.66 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 0.78 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.62;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.68 + time * 1.23)) * (0.027 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
