uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	vec3 col = vec3(0.000, 0.039, 0.079);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.28 + (time * 0.65) * 1.52), sin(fi * 2.28 + (time * 0.65) * 1.52)) * (0.50 + 0.19 * sin(fi * 1.7 + (time * 0.65) * 1.94));
		vec2 bq = abs(p - q) - vec2(0.09, 0.06);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.48) + fi * 1.88 + (time * 0.65) * 0.23)) * (0.024 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.957, 1.026, 0.939) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
