uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2((time * 0.73) * -0.76) * p;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.30 * sin((time * 0.73) * 1.22), 0.26 + 0.16 * cos((time * 0.73) * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.48);
	vec3 col = palette((v * 3.42) * 0.62 + (time * 0.73) * 0.21, vec3(0.37, 0.31, 0.40), vec3(0.13, 0.11, 0.16), vec3(0.85, 0.42, 0.84), vec3(0.36, 0.49, 0.51));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.14 + (time * 0.73) * 8.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.972, 0.919) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
