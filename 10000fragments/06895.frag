uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	p = rot2(time * -0.46) * p;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.27 * sin(time * 1.24), -0.26 + 0.07 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.38);
	vec3 col = palette(v * 3.87 * 1.28 + time * 0.05, vec3(0.44, 0.46, 0.48), vec3(0.34, 0.38, 0.31), vec3(0.77, 1.24, 0.87), vec3(0.49, 0.15, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
