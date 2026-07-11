uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * 0.93) * p;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.21 * sin(time * 1.23), -0.36 + 0.29 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.40);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.13 * 3.66 + time * 0.12);
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
