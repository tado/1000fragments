uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * 0.77) * p;
	vec2 z = p;
	vec2 c = vec2(0.16 + 0.24 * sin(time * 1.42), -0.53 + 0.27 * cos(time * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.58);
	vec3 col = palette(v * 2.00 * 0.61 + time * 0.32, vec3(0.54, 0.46, 0.48), vec3(0.34, 0.35, 0.44), vec3(1.00, 1.07, 1.01), vec3(0.49, 0.18, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
