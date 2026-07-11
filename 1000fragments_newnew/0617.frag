uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.67;
	p = rot2((time * 0.79) * -0.71) * p;
	vec3 col = vec3(0.008, 0.044, 0.057);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.79) * 0.97 * (0.3 + fi * 0.24) + fi * 2.4), cos((time * 0.79) * 1.27 * (0.4 + fi * 0.05) + fi * 1.7)) * 0.50;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + fi * 1.67 + (time * 0.79) * 1.33)) * (0.012 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 0.988, 0.983) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
