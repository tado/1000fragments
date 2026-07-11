uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	vec3 col = vec3(0.018, 0.060, 0.077);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.19 + time * 0.56), sin(fi * 1.19 + time * 0.56)) * (0.60 + 0.29 * sin(fi * 1.7 + time * 0.50));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.88 + time * 1.06)) * (0.037 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
