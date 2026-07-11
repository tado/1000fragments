uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	p = rot2((time * 0.67) * 0.46) * p;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.23 * sin((time * 0.67) * 0.68), 0.15 + 0.11 * cos((time * 0.67) * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.47);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.66)) * vec3(0.45, 0.49, 0.48) + vec3(0.11, 0.08, 0.07);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 1.013, 1.000) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
