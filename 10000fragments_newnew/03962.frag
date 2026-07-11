uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(time * 0.63) * p;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.23 * sin(time * 1.99), 0.09 + 0.18 * cos(time * 1.18));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.13);
	vec3 col = palette(v * 1.90 * 0.64 + time * 0.14, vec3(0.54, 0.50, 0.44), vec3(0.41, 0.49, 0.48), vec3(1.26, 1.10, 1.05), vec3(0.59, 0.85, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
