uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = rot2((time * 0.76) * -0.60) * p;
	vec3 col = vec3(0.057, 0.038, 0.013);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.90 + (time * 0.76) * 0.96), sin(fi * 0.90 + (time * 0.76) * 0.96)) * (0.77 + 0.26 * sin(fi * 1.7 + (time * 0.76) * 0.86));
		vec2 bq = abs(p - q) - vec2(0.23, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.69, 1.38) + fi * 1.56 + (time * 0.76) * 1.49)) * (0.010 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 0.971, 1.056) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
