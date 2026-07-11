uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(time * 1.12) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.28 * sin(time * 1.89), -0.50 + 0.10 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.11);
	vec3 col = vec3(0.5 + 0.5 * v * 2.04) * vec3(1.19, 1.46, 1.23) + vec3(0.07, 0.11, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
