uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	p = rot2(time * -1.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.24 * sin(time * 1.08), -0.28 + 0.09 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.59);
	vec3 col = vec3(0.88, 0.77, 0.56) * (0.24 / (abs(v * 1.62) + 0.07));
	col = col / (1.0 + col);
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 1.95 + time * 5.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
