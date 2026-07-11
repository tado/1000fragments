uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * 0.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.70 + 0.21 * sin(time * 1.49), -0.41 + 0.24 * cos(time * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.11);
	float cc = clamp(0.5 + 0.5 * v * 2.69, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.10, 0.12), vec3(0.77, 0.88, 0.41), cc);
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
