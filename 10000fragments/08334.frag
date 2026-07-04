uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	vec3 col = vec3(0.041, 0.033, 0.051);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.15 + time * 1.45), sin(fi * 2.15 + time * 1.45)) * (0.35 + 0.19 * sin(fi * 1.7 + time * 0.71));
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 1.18)) * (0.016 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
