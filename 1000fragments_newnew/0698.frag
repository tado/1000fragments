uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	vec3 col = vec3(0.049, 0.045, 0.055);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.50) * 0.70 * (0.3 + fi * 0.17) + fi * 2.4), cos((time * 0.50) * 0.66 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.94;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.87) + fi * 1.07 + (time * 0.50) * 0.23)) * (0.027 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.977, 0.916) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
