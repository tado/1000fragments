uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = rot2(time * 1.29) * p;
	vec2 z = p;
	vec2 c = vec2(0.28 + 0.27 * sin(time * 0.79), -0.09 + 0.28 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.12);
	vec3 col = palette(v * 2.65 * 1.40 + time * 0.03, vec3(0.59, 0.47, 0.49), vec3(0.41, 0.48, 0.32), vec3(1.01, 1.39, 0.82), vec3(0.26, 0.21, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
