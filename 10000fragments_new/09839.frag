uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	p = rot2(time * -0.67) * p;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.07 * sin(time * 1.59), -0.16 + 0.09 * cos(time * 1.03));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.00);
	vec3 col = vec3(0.36, 0.49, 0.98) * (0.06 / (abs(v * 3.22) + 0.05));
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 2.37 + time * 10.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
