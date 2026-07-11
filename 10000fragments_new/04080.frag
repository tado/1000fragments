uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	vec3 col = vec3(0.031, 0.009, 0.071);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.77 + time * 2.07), sin(fi * 0.77 + time * 2.07)) * (0.66 + 0.39 * sin(fi * 1.7 + time * 1.12));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.41 + time * 1.40)) * (0.031 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
