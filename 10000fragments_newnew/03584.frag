uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	vec3 col = vec3(0.019, 0.008, 0.015);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.30 * (0.3 + fi * 0.09) + fi * 2.4), cos(time * 0.99 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.49;
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.40 + time * 0.55)) * (0.020 / (gd + 0.028));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
