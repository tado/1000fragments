uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	vec3 col = vec3(0.019, 0.039, 0.011);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.98 + time * 0.66), sin(fi * 0.98 + time * 0.66)) * (0.76 + 0.38 * sin(fi * 1.7 + time * 1.91));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.88 + time * 0.97)) * (0.036 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.72 + time * 7.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
