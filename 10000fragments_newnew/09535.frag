uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2(time * 0.91) * p;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.10 * sin(time * 0.72), -0.33 + 0.21 * cos(time * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.28, 0.03)));
	}
	float v = exp(-trap * 5.36);
	vec3 col = palette(v * 2.49 * 0.47 + time * 0.29, vec3(0.47, 0.58, 0.44), vec3(0.42, 0.32, 0.44), vec3(1.27, 1.22, 1.19), vec3(0.68, 0.34, 0.52));
	col *= 0.80 + 0.13 * sin(gl_FragCoord.y * 1.28 + time * 7.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
