uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	vec3 col = vec3(0.010, 0.027, 0.054);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.88 + (time * 0.69) * 1.14), sin(fi * 1.88 + (time * 0.69) * 1.14)) * (0.38 + 0.14 * sin(fi * 1.7 + (time * 0.69) * 0.74));
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.63, 3.26) + fi * 1.70 + (time * 0.69) * 0.44)) * (0.028 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 1.008, 0.919) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
