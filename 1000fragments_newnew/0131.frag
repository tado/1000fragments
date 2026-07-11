uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	p = rot2((time * 0.78) * 0.45) * p;
	vec3 col = vec3(0.043, 0.058, 0.068);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.78) * 0.50 * (0.3 + fi * 0.08) + fi * 2.4), cos((time * 0.78) * 1.32 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.57;
		vec2 bq = abs(p - q) - vec2(0.24, 0.23);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.88, 1.76) + fi * 1.52 + (time * 0.78) * 1.35)) * (0.024 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.948, 1.010) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
