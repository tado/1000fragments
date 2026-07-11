uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p = rot2(time * 0.34) * p;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.16 * sin(time * 0.70), 0.24 + 0.22 * cos(time * 1.49));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.34);
	float cc = clamp(0.5 + 0.5 * v * 3.24, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.03, 0.36), vec3(0.69, 0.61, 0.51), cc);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 0.88 + time * 7.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
