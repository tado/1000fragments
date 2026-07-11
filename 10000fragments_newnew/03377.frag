uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	vec3 col = vec3(0.045, 0.009, 0.056);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.66 + time * 1.85), sin(fi * 0.66 + time * 1.85)) * (0.48 + 0.13 * sin(fi * 1.7 + time * 0.89));
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.00 + time * 0.73)) * (0.019 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.73 + time * 16.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
