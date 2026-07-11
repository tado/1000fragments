uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	p = rot2((time * 0.71) * 0.49) * p;
	vec3 col = vec3(0.030, 0.031, 0.032);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.41 + (time * 0.71) * 1.94), sin(fi * 2.41 + (time * 0.71) * 1.94)) * (0.63 + 0.38 * sin(fi * 1.7 + (time * 0.71) * 0.83));
		vec2 bq = abs(p - q) - vec2(0.13, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.63, 1.27) + fi * 0.78 + (time * 0.71) * 1.40)) * (0.009 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.979, 0.991) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
