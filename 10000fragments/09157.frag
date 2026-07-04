uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.035, 0.028);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.50 * (0.3 + fi * 0.20) + fi * 2.4), cos(time * 1.39 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.86;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.82 + time * 0.72)) * (0.023 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 1.82 + time * 15.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
