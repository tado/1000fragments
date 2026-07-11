uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p = rot2(time * 0.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.89 + 0.30 * sin(time * 0.99), -0.21 + 0.25 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.25, -0.50)));
	}
	float v = exp(-trap * 1.98);
	float cc = clamp(0.5 + 0.5 * v * 3.50, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.25, 0.13), vec3(0.68, 0.90, 0.79), cc);
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
