uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	p = rot2(time * -0.36) * p;
	vec3 col = vec3(0.013, 0.002, 0.072);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.87 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 1.36 * (0.4 + fi * 0.17) + fi * 1.7)) * 0.92;
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.74 + time * 0.33)) * (0.026 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
