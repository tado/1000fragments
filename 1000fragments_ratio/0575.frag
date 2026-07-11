uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.51;
	p *= 1.90;
	p = rot2((time * 0.83) * 1.16) * p;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.22 * sin((time * 0.83) * 1.73), 0.37 + 0.22 * cos((time * 0.83) * 0.77));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.48);
	float cc = clamp(0.5 + 0.5 * (v * 1.60), 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.37, 0.20), vec3(0.61, 0.53, 0.47), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.959, 1.029) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
