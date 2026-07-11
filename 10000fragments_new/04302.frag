uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.029, 0.031, 0.045);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.11 * (0.3 + fi * 0.06) + fi * 2.4), cos(time * 0.68 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.42;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.38 + time * 0.48)) * (0.027 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
