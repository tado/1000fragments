uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(time * 0.87) * p;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.05 * sin(time * 0.66), 0.19 + 0.24 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.44);
	vec3 col = palette(v * 1.82 * 1.09 + time * 0.24, vec3(0.42, 0.41, 0.55), vec3(0.46, 0.47, 0.46), vec3(1.05, 0.90, 0.92), vec3(0.15, 0.61, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
