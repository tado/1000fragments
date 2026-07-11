uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.72;
	vec3 col = vec3(0.059, 0.046, 0.015);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.21 * (0.3 + fi * 0.10) + fi * 2.4), cos(time * 0.91 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.57;
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.12 + time * 0.97)) * (0.013 / (gd + 0.032));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
