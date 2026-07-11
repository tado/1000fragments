uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2((time * 0.54) * -1.14) * p;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.08 * sin((time * 0.54) * 1.83), 0.59 + 0.19 * cos((time * 0.54) * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.02);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.04)) * vec3(0.49, 0.58, 0.50) + vec3(0.10, 0.03, 0.07);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.994, 0.921) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
