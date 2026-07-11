uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	vec3 col = vec3(0.015, 0.040, 0.054);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.07 * (0.3 + fi * 0.16) + fi * 2.4), cos(time * 1.04 * (0.4 + fi * 0.21) + fi * 1.7)) * 0.91;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.13 + time * 0.30)) * (0.008 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
