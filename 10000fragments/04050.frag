uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = rot2(time * -0.62) * p;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.07 * sin(time * 0.92), -0.54 + 0.17 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.53);
	vec3 col = vec3(0.5 + 0.5 * v * 1.69) * vec3(0.93, 1.45, 0.70) + vec3(0.01, 0.04, 0.15);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
