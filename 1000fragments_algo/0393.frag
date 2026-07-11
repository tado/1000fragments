uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.x += p.y * 0.70;
	vec3 col = vec3(0.015, 0.027, 0.031);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.70) * 1.48 * (0.3 + fi * 0.10) + fi * 2.4), cos((time * 0.70) * 0.46 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.83;
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.97, 1.94) + fi * 0.44 + (time * 0.70) * 0.28)) * (0.035 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 1.009, 1.001) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
