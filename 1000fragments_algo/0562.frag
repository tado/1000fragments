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
	p.y = abs(p.y) - 0.52;
	p *= 1.31;
	p = rot2((time * 0.73) * 0.99) * p;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.28 * sin((time * 0.73) * 1.24), 0.03 + 0.25 * cos((time * 0.73) * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.14);
	vec3 col = palette((v * 2.40) * 0.96 + (time * 0.73) * 0.06, vec3(0.46, 0.44, 0.36), vec3(0.32, 0.24, 0.30), vec3(0.67, 0.64, 0.73), vec3(0.20, 0.85, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.59));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.997, 0.939) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
