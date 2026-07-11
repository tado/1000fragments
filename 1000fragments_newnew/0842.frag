uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	vec3 col = vec3(0.040, 0.008, 0.065);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.68) * 0.41 * (0.3 + fi * 0.24) + fi * 2.4), cos((time * 0.68) * 1.51 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.92;
		vec2 bq = abs(p - q) - vec2(0.16, 0.13);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.47, 0.94) + fi * 1.61 + (time * 0.68) * 1.03)) * (0.016 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 0.977, 0.938) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
