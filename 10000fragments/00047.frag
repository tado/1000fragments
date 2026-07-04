uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec3 col = vec3(0.021, 0.025, 0.013);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.77 + time * 1.21), sin(fi * 0.77 + time * 1.21)) * (0.67 + 0.37 * sin(fi * 1.7 + time * 1.05));
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.75 + time * 1.16)) * (0.017 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
