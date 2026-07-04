uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	p = rot2(time * -1.18) * p;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.29 * sin(time * 1.45), -0.20 + 0.05 * cos(time * 0.52));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.82);
	vec3 col = palette(v * 2.46 * 0.84 + time * 0.22, vec3(0.48, 0.59, 0.42), vec3(0.41, 0.43, 0.49), vec3(1.39, 1.13, 1.11), vec3(0.65, 0.55, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
