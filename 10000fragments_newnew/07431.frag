uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	p = rot2(time * 0.50) * p;
	vec2 z = p;
	vec2 c = vec2(0.09 + 0.06 * sin(time * 1.86), 0.57 + 0.19 * cos(time * 1.00));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.97);
	vec3 col = vec3(0.5 + 0.5 * v * 2.44) * vec3(1.28, 0.82, 1.17) + vec3(0.05, 0.19, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
