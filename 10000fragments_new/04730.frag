uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	vec3 col = vec3(0.021, 0.054, 0.019);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.52 * (0.3 + fi * 0.13) + fi * 2.4), cos(time * 1.45 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.43;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.82 + time * 0.38)) * (0.012 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
