uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	p = rot2(time * -0.84) * p;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.20 * sin(time * 1.03), 0.10 + 0.23 * cos(time * 1.06));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.98);
	vec3 col = vec3(0.5 + 0.5 * v * 1.65) * vec3(1.38, 0.84, 0.70) + vec3(0.00, 0.05, 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
