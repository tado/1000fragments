uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	vec3 col = vec3(0.009, 0.004, 0.065);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.33 + time * 1.88), sin(fi * 1.33 + time * 1.88)) * (0.78 + 0.31 * sin(fi * 1.7 + time * 0.52));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.72 + time * 1.47)) * (0.032 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
