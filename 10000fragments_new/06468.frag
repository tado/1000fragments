uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.83;
	vec3 col = vec3(0.031, 0.021, 0.041);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.52 + time * 2.18), sin(fi * 1.52 + time * 2.18)) * (0.71 + 0.13 * sin(fi * 1.7 + time * 0.62));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.73 + time * 1.30)) * (0.033 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
