uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.62) * -1.35) * p;
	vec3 col = vec3(0.028, 0.018, 0.024);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.62) * 0.45 * (0.3 + fi * 0.18) + fi * 2.4), cos((time * 0.62) * 0.92 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.69;
		vec2 bq = abs(p - q) - vec2(0.20, 0.07);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.92, 1.83) + fi * 1.56 + (time * 0.62) * 1.04)) * (0.016 / (gd + 0.017));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.996, 1.026) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
