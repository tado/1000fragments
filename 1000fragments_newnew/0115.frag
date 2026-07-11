uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2((time * 0.51) * -0.99) * p;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.28 * sin((time * 0.51) * 0.85), -0.54 + 0.22 * cos((time * 0.51) * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.46);
	vec3 col = vec3(0.57, 0.57, 0.55) * (0.06 / (abs((v * 3.49)) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.935, 0.965, 1.060) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
