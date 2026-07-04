uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	p = rot2(time * 1.50) * p;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.12 * sin(time * 1.10), 0.16 + 0.14 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.90);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.66 * 3.32 + time * 0.87);
	col *= 0.80 + 0.18 * sin(gl_FragCoord.y * 1.10 + time * 13.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
