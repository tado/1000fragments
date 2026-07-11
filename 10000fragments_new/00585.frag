uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p = rot2(time * 1.07) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.28 * sin(time * 1.65), 0.39 + 0.09 * cos(time * 1.34));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.47);
	float cc = clamp(0.5 + 0.5 * v * 3.73, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.01, 0.17), vec3(0.55, 0.73, 0.77), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
