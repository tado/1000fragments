uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec3 col = vec3(0.007, 0.034, 0.075);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.34 + time * 0.94), sin(fi * 2.34 + time * 0.94)) * (0.62 + 0.11 * sin(fi * 1.7 + time * 0.69));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.65 + time * 0.59)) * (0.017 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
