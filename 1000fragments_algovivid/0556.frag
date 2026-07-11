uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.61) * 1.11), cos((time * 0.61) * 0.68)) * 0.09;
	p *= 1.73;
	p = rot2((time * 0.61) * 0.90) * p;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.16 * sin((time * 0.61) * 1.26), -0.17 + 0.10 * cos((time * 0.61) * 1.29));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.03);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.12)) * vec3(0.55, 0.53, 0.59) + vec3(0.10, 0.12, 0.11);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 1.015, 0.993) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
