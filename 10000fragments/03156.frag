uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.006, 0.035, 0.054);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.39 + time * 1.26), sin(fi * 2.39 + time * 1.26)) * (0.74 + 0.16 * sin(fi * 1.7 + time * 1.30));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.79 + time * 0.46)) * (0.020 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
