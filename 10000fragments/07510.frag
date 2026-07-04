uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	p = rot2(time * 0.82) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.09 * sin(time * 1.23), 0.40 + 0.11 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.54);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.74 * 1.54 + time * 0.98);
	col = fract(col * 1.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
