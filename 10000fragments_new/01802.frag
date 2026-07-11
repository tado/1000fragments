uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p = rot2(time * 1.21) * p;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.27 * sin(time * 0.58), -0.20 + 0.14 * cos(time * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.06, 0.33)));
	}
	float v = exp(-trap * 3.69);
	vec3 col = vec3(0.31, 0.37, 0.99) * (0.16 / (abs(v * 2.63) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
