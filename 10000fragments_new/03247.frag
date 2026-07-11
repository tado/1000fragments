uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.022, 0.046, 0.056);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.21 + time * 2.49), sin(fi * 1.21 + time * 2.49)) * (0.70 + 0.11 * sin(fi * 1.7 + time * 1.25));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.94 + time * 0.99)) * (0.023 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
