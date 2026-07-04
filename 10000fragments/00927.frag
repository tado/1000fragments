uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	vec3 col = vec3(0.057, 0.051, 0.061);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.49 + time * 0.94), sin(fi * 2.49 + time * 0.94)) * (0.37 + 0.30 * sin(fi * 1.7 + time * 0.97));
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.56 + time * 0.96)) * (0.025 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
