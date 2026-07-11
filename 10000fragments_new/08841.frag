uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	vec3 col = vec3(0.012, 0.050, 0.016);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.09 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.52 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.66;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.51 + time * 0.49)) * (0.032 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
