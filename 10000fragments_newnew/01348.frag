uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	p = rot2(time * -1.53) * p;
	vec2 z = p;
	vec2 c = vec2(0.01 + 0.05 * sin(time * 1.82), 0.12 + 0.18 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.73);
	vec3 col = vec3(0.5 + 0.5 * v * 2.76) * vec3(1.29, 0.55, 1.41) + vec3(0.09, 0.06, 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
