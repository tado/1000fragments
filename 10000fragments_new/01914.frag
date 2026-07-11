uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = rot2(time * 0.36) * p;
	vec2 z = p;
	vec2 c = vec2(-0.10 + 0.13 * sin(time * 1.09), 0.30 + 0.09 * cos(time * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.66);
	vec3 col = vec3(0.5 + 0.5 * v * 1.85) * vec3(0.79, 0.65, 0.94) + vec3(0.17, 0.13, 0.17);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
