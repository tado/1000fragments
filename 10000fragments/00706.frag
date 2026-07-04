uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	vec3 col = vec3(0.022, 0.053, 0.047);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.61 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 0.58 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.76;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.19 + time * 1.16)) * (0.027 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
