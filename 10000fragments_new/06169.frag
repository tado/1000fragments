uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	p = rot2(time * -0.85) * p;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.28 * sin(time * 1.21), 0.15 + 0.13 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.10);
	float cc = clamp(0.5 + 0.5 * v * 2.48, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.26, 0.10), vec3(0.79, 0.58, 0.43), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
