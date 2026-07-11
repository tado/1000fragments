uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p = rot2(time * 0.48) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.15 * sin(time * 0.79), -0.26 + 0.13 * cos(time * 1.07));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.69);
	vec3 col = vec3(0.54, 0.31, 0.76) * (0.12 / (abs(v * 3.24) + 0.03));
	col = col / (1.0 + col);
	col = mod(col * 2.07, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
