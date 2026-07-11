uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	p = rot2(time * -0.79) * p;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.14 * sin(time * 1.31), -0.14 + 0.14 * cos(time * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.29);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.75 * 1.96 + time * 0.14);
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 2.66 + time * 11.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
