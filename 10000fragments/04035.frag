uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	vec3 col = vec3(0.025, 0.055, 0.055);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.19 + time * 2.39), sin(fi * 2.19 + time * 2.39)) * (0.79 + 0.25 * sin(fi * 1.7 + time * 1.90));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 1.44)) * (0.030 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
