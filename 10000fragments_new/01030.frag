uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	vec3 col = vec3(0.051, 0.011, 0.035);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.54 + time * 2.32), sin(fi * 0.54 + time * 2.32)) * (0.40 + 0.32 * sin(fi * 1.7 + time * 1.74));
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.92 + time * 0.90)) * (0.039 / (gd + 0.039));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
