uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	vec3 col = vec3(0.039, 0.020, 0.036);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.34 + time * 2.18), sin(fi * 1.34 + time * 2.18)) * (0.36 + 0.19 * sin(fi * 1.7 + time * 1.76));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.96 + time * 0.67)) * (0.008 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
