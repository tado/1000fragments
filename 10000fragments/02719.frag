uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	vec3 col = vec3(0.007, 0.013, 0.052);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.65 + time * 1.09), sin(fi * 0.65 + time * 1.09)) * (0.70 + 0.11 * sin(fi * 1.7 + time * 1.98));
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.53 + time * 0.29)) * (0.014 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.37 + time * 6.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
