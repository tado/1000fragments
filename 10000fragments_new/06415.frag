uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -1.21) * p;
	vec2 z = p;
	vec2 c = vec2(0.10 + 0.25 * sin(time * 1.84), -0.43 + 0.25 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.15, 0.45)));
	}
	float v = exp(-trap * 5.61);
	vec3 col = vec3(0.15, 0.29, 0.96) * (0.25 / (abs(v * 2.84) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
