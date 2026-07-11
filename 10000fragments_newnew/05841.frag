uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	vec3 col = vec3(0.016, 0.014, 0.013);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.25 + time * 1.83), sin(fi * 2.25 + time * 1.83)) * (0.67 + 0.36 * sin(fi * 1.7 + time * 0.55));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.90 + time * 1.13)) * (0.038 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
