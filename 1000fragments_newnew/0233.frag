uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	vec3 col = vec3(0.021, 0.006, 0.042);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.43 + (time * 0.81) * 1.33), sin(fi * 2.43 + (time * 0.81) * 1.33)) * (0.74 + 0.25 * sin(fi * 1.7 + (time * 0.81) * 1.71));
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.92, 1.83) + fi * 1.78 + (time * 0.81) * 1.33)) * (0.016 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.968, 1.015) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
