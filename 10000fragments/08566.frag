uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * 0.78) * p;
	vec2 z = p;
	vec2 c = vec2(0.04 + 0.16 * sin(time * 1.07), 0.51 + 0.16 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.42);
	vec3 col = palette(v * 1.69 * 0.63 + time * 0.20, vec3(0.55, 0.48, 0.59), vec3(0.49, 0.40, 0.41), vec3(0.91, 1.33, 0.84), vec3(0.57, 0.85, 0.25));
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.15 + time * 13.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
