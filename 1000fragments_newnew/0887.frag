uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = rot2((time * 0.57) * 0.59) * p;
	vec2 z = p;
	vec2 c = vec2(0.01 + 0.18 * sin((time * 0.57) * 1.80), -0.04 + 0.11 * cos((time * 0.57) * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.40);
	float cc = clamp(0.5 + 0.5 * (v * 2.34), 0.0, 1.0);
	vec3 col = mix(vec3(0.72, 0.69, 0.69), vec3(0.13, 0.13, 0.07), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 1.023, 0.934) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
