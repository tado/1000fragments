uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec3 col = vec3(0.021, 0.041, 0.020);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.72 + time * 2.11), sin(fi * 0.72 + time * 2.11)) * (0.40 + 0.24 * sin(fi * 1.7 + time * 1.80));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.59 + time * 1.46)) * (0.014 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
