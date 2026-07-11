uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.55;
	p = p.yx;
	p *= 1.53;
	p = rot2((time * 0.79) * 1.05) * p;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.24 * sin((time * 0.79) * 0.94), 0.16 + 0.10 * cos((time * 0.79) * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.99);
	float cc = clamp(0.5 + 0.5 * (v * 2.44), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.06, 0.11), vec3(0.43, 0.50, 0.65), smoothstep(0.0, 1.0, cc));
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.35 + (time * 0.79) * 16.84);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.994, 1.020) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
