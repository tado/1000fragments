uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.01 + (time * 0.76) * 0.60) * 0.09;
	p *= 1.79;
	p = rot2((time * 0.76) * 0.44) * p;
	vec3 col = vec3(0.035, 0.032, 0.005);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.76) * 0.77 * (0.3 + fi * 0.13) + fi * 2.4), cos((time * 0.76) * 0.79 * (0.4 + fi * 0.20) + fi * 1.7)) * 0.66;
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.39, 2.78) + fi * 1.45 + (time * 0.76) * 1.08)) * (0.017 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.999, 0.932) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
