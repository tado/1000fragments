uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(time * -0.46) * p;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.25 * sin(time * 1.55), 0.55 + 0.14 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.12);
	float cc = clamp(0.5 + 0.5 * v * 1.58, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.19, 0.54), vec3(0.62, 0.68, 0.66), cc);
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
