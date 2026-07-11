uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.016, 0.031, 0.079);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.85 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.53 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.94;
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.59 + time * 0.32)) * (0.017 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
