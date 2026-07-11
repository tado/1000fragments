uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = rot2((time * 0.72) * -1.11) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.07 * sin((time * 0.72) * 1.68), 0.55 + 0.14 * cos((time * 0.72) * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.65);
	float cc = clamp(0.5 + 0.5 * (v * 3.95), 0.0, 1.0);
	vec3 col = mix(vec3(0.68, 0.72, 0.68), vec3(0.16, 0.08, 0.14), cc);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.62 + (time * 0.72) * 8.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 0.990, 1.006) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
