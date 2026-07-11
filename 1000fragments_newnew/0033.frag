uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.056, 0.047, 0.013);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.63) * 0.91 * (0.3 + fi * 0.16) + fi * 2.4), cos((time * 0.63) * 0.55 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.42;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.61, 1.22) + fi * 0.74 + (time * 0.63) * 0.96)) * (0.011 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 0.978, 0.920) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
