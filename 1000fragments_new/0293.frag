uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -0.80) * p;
	vec2 z = p;
	vec2 c = vec2(-0.38 + 0.28 * sin(time * 1.92), -0.10 + 0.13 * cos(time * 0.77));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.22, 0.15)));
	}
	float v = exp(-trap * 5.02);
	float cc = clamp(0.5 + 0.5 * v * 2.55, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.19, 0.24), vec3(0.98, 0.71, 0.58), cc);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.90 + time * 16.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
