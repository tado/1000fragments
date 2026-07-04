uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.043, 0.032, 0.038);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.36 + time * 1.07), sin(fi * 1.36 + time * 1.07)) * (0.33 + 0.23 * sin(fi * 1.7 + time * 0.53));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.19 + time * 0.67)) * (0.008 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
