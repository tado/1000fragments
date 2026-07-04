uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	vec3 col = vec3(0.022, 0.055, 0.077);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.79 + time * 1.34), sin(fi * 1.79 + time * 1.34)) * (0.74 + 0.11 * sin(fi * 1.7 + time * 1.84));
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.84 + time * 0.71)) * (0.013 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
