uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.018, 0.015, 0.001);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.95 + (time * 0.69) * 0.61), sin(fi * 0.95 + (time * 0.69) * 0.61)) * (0.44 + 0.24 * sin(fi * 1.7 + (time * 0.69) * 1.12));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.07, 2.13) + fi * 1.24 + (time * 0.69) * 1.15)) * (0.017 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 0.985, 0.914) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
