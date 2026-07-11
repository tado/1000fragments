uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	vec3 col = vec3(0.026, 0.057, 0.077);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.14 + (time * 0.79) * 0.74), sin(fi * 2.14 + (time * 0.79) * 0.74)) * (0.50 + 0.21 * sin(fi * 1.7 + (time * 0.79) * 1.98));
		vec2 bq = abs(p - q) - vec2(0.11, 0.12);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.51, 1.01) + fi * 1.37 + (time * 0.79) * 0.71)) * (0.021 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.956, 0.996) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
