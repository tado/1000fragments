uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	p = rot2(time * 1.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.52 + 0.28 * sin(time * 1.77), -0.35 + 0.23 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.37);
	vec3 col = vec3(0.5 + 0.5 * v * 1.99) * vec3(0.66, 1.22, 1.13) + vec3(0.02, 0.24, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
