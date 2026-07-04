uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2(time * -1.55) * p;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.15 * sin(time * 1.47), 0.55 + 0.25 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.06);
	vec3 col = vec3(0.42, 0.23, 0.85) * (0.18 / (abs(v * 2.55) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
