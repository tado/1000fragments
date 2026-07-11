uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.60;
	p = rot2((time * 0.56) * 1.56) * p;
	vec2 z = p;
	vec2 c = vec2(0.13 + 0.24 * sin((time * 0.56) * 1.24), 0.28 + 0.16 * cos((time * 0.56) * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.36);
	vec3 col = vec3(0.67, 0.70, 0.68) * (0.10 / (abs((v * 2.06)) + 0.04));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 1.004, 0.924) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
