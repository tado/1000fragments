uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p = rot2(time * 0.36) * p;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.10 * sin(time * 0.65), 0.08 + 0.22 * cos(time * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.58);
	float cc = clamp(0.5 + 0.5 * v * 2.06, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.21, 0.19), vec3(1.00, 0.85, 0.49), cc);
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
