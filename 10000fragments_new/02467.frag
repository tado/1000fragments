uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	vec3 col = vec3(0.043, 0.041, 0.030);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.73 + time * 2.04), sin(fi * 1.73 + time * 2.04)) * (0.64 + 0.21 * sin(fi * 1.7 + time * 0.72));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.98 + time * 0.38)) * (0.016 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
