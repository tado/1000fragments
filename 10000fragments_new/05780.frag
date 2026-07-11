uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * 0.86) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.16 * sin(time * 0.84), 0.28 + 0.29 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.94);
	vec3 col = vec3(0.24, 0.17, 0.95) * (0.19 / (abs(v * 3.56) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
