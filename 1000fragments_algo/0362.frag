uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec3 col = vec3(0.025, 0.002, 0.060);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.58 + (time * 0.57) * 2.32), sin(fi * 1.58 + (time * 0.57) * 2.32)) * (0.65 + 0.16 * sin(fi * 1.7 + (time * 0.57) * 1.41));
		vec2 bq = abs(p - q) - vec2(0.19, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.64) + fi * 1.14 + (time * 0.57) * 1.29)) * (0.024 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 1.002, 1.017) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
