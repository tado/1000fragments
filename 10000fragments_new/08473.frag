uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.99;
	vec3 col = vec3(0.054, 0.038, 0.065);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.04 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.58 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.85;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.24 + time * 0.86)) * (0.032 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
