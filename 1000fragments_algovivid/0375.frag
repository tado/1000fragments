uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p *= 2.11;
	vec3 col = vec3(0.020, 0.044, 0.059);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.20 + (time * 0.61) * 1.00), sin(fi * 2.20 + (time * 0.61) * 1.00)) * (0.70 + 0.27 * sin(fi * 1.7 + (time * 0.61) * 1.04));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + fi * 1.95 + (time * 0.61) * 1.41)) * (0.014 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.002, 0.941) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
