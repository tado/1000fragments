uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.055, 0.002, 0.069);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.45 + time * 1.16), sin(fi * 2.45 + time * 1.16)) * (0.60 + 0.16 * sin(fi * 1.7 + time * 1.17));
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.96 + time * 1.45)) * (0.020 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
