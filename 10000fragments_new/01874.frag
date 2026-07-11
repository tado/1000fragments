uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p = rot2(time * 1.23) * p;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.08 * sin(time * 1.65), 0.27 + 0.30 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.61);
	vec3 col = vec3(0.5 + 0.5 * v * 1.66) * vec3(0.58, 1.34, 1.33) + vec3(0.11, 0.10, 0.14);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.92 + time * 11.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
