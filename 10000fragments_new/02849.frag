uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec3 col = vec3(0.059, 0.030, 0.019);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.58 + time * 1.39), sin(fi * 0.58 + time * 1.39)) * (0.75 + 0.36 * sin(fi * 1.7 + time * 1.19));
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.40 + time * 1.22)) * (0.040 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.10 + time * 7.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
