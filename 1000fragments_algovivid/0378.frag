uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.66 + (time * 0.61) * 0.84) * 0.09;
	p *= 1.27;
	vec3 col = vec3(0.025, 0.028, 0.076);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.45 + (time * 0.61) * 0.54), sin(fi * 1.45 + (time * 0.61) * 0.54)) * (0.53 + 0.30 * sin(fi * 1.7 + (time * 0.61) * 1.78));
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.12, 2.24) + fi * 1.81 + (time * 0.61) * 1.21)) * (0.037 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 1.026, 0.930) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
