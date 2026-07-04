uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	vec3 col = vec3(0.021, 0.009, 0.040);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.25 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 0.51 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.83;
		float gd = abs(length(p - q) - 0.19);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.45 + time * 0.43)) * (0.025 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
