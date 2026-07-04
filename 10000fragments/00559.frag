uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.004, 0.005, 0.038);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.47 + time * 1.32), sin(fi * 1.47 + time * 1.32)) * (0.76 + 0.14 * sin(fi * 1.7 + time * 0.74));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 0.78)) * (0.027 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 2.51 + time * 5.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
