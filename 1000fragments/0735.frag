uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = rot2(time * -0.52) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.09 * sin(time * 1.10), 0.50 + 0.07 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.71);
	vec3 col = vec3(0.5 + 0.5 * v * 2.92) * vec3(0.67, 1.17, 0.61) + vec3(0.20, 0.10, 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
