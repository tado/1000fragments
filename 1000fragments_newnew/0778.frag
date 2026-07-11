uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	p = rot2((time * 0.68) * -0.87) * p;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.08 * sin((time * 0.68) * 1.45), -0.37 + 0.29 * cos((time * 0.68) * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.19);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.67)) * vec3(0.56, 0.66, 0.66) + vec3(0.03, 0.08, 0.06);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.977, 0.995) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
