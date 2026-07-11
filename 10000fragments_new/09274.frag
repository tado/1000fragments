uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.23;
	vec3 col = vec3(0.004, 0.024, 0.065);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.17 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 0.74 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.99;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.69 + time * 1.45)) * (0.024 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
