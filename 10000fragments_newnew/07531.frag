uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	vec3 col = vec3(0.030, 0.035, 0.002);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.18 * (0.3 + fi * 0.19) + fi * 2.4), cos(time * 0.85 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.83;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.78 + time * 0.26)) * (0.019 / (gd + 0.010));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
