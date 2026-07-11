uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2((time * 0.71) * -1.27) * p;
	vec2 z = p;
	vec2 c = vec2(-0.47 + 0.28 * sin((time * 0.71) * 0.89), 0.46 + 0.19 * cos((time * 0.71) * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.23);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.99)) * vec3(0.64, 0.64, 0.71) + vec3(0.07, 0.04, 0.03);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.979, 0.995) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
