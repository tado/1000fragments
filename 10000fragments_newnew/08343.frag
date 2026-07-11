uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	p = rot2(time * 1.14) * p;
	vec2 z = p;
	vec2 c = vec2(-0.68 + 0.15 * sin(time * 1.52), 0.16 + 0.24 * cos(time * 0.80));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.29);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.31 * 3.37 + time * 0.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
