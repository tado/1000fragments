uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	vec3 col = vec3(0.041, 0.023, 0.045);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.71 + time * 1.26), sin(fi * 0.71 + time * 1.26)) * (0.76 + 0.36 * sin(fi * 1.7 + time * 1.83));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.74 + time * 1.10)) * (0.032 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.84 + time * 16.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
