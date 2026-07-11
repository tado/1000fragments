uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.83 + (time * 0.85) * 0.46) * 0.08;
	p *= 2.03;
	p = rot2((time * 0.85) * 0.46) * p;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.29 * sin((time * 0.85) * 0.99), -0.42 + 0.17 * cos((time * 0.85) * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.37);
	float cc = clamp(0.5 + 0.5 * (v * 3.08), 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.12, 0.13), vec3(0.76, 0.88, 0.80), cc);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 1.86 + (time * 0.85) * 9.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 0.974, 1.040) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
