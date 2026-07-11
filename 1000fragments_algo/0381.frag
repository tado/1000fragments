uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.43;
	p.y += sin(p.x * 2.16 + (time * 0.56) * 1.04) * 0.19;
	p *= 2.42;
	p = rot2((time * 0.56) * -0.73) * p;
	vec3 col = vec3(0.003, 0.057, 0.029);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.19 + (time * 0.56) * 2.17), sin(fi * 2.19 + (time * 0.56) * 2.17)) * (0.46 + 0.20 * sin(fi * 1.7 + (time * 0.56) * 1.70));
		float gd = abs(length(p - q) - 0.25);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.94, 1.87) + fi * 1.37 + (time * 0.56) * 1.06)) * (0.018 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.948, 1.009) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
