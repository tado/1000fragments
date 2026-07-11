uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	vec3 col = vec3(0.040, 0.056, 0.022);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.29 * (0.3 + fi * 0.23) + fi * 2.4), cos(time * 1.39 * (0.4 + fi * 0.15) + fi * 1.7)) * 0.46;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.54 + time * 0.38)) * (0.016 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
