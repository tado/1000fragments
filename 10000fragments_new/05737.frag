uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	vec3 col = vec3(0.041, 0.029, 0.077);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.78 + time * 1.56), sin(fi * 1.78 + time * 1.56)) * (0.65 + 0.14 * sin(fi * 1.7 + time * 1.87));
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.96 + time * 0.77)) * (0.039 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
