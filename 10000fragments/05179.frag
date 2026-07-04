uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	p = rot2(time * -0.91) * p;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.14 * sin(time * 0.80), 0.50 + 0.22 * cos(time * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.46, -0.05)));
	}
	float v = exp(-trap * 2.95);
	vec3 col = palette(v * 3.07 * 1.34 + time * 0.17, vec3(0.52, 0.48, 0.51), vec3(0.43, 0.46, 0.44), vec3(1.04, 1.01, 0.85), vec3(0.14, 0.19, 0.61));
	col = mod(col * 2.10, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
