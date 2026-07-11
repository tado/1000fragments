uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	vec3 col = vec3(0.031, 0.054, 0.006);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.57 * (0.3 + fi * 0.14) + fi * 2.4), cos(time * 0.96 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.93;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.14 + time * 0.69)) * (0.038 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
