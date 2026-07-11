uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	vec3 col = vec3(0.037, 0.012, 0.024);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.37 + (time * 0.64) * 1.28), sin(fi * 2.37 + (time * 0.64) * 1.28)) * (0.71 + 0.36 * sin(fi * 1.7 + (time * 0.64) * 0.61));
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.69) + fi * 1.73 + (time * 0.64) * 0.97)) * (0.015 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.966, 1.060) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
