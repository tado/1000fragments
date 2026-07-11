uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p = rot2(time * 1.20) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.18 * sin(time * 1.84), 0.48 + 0.28 * cos(time * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.26);
	vec3 col = palette(v * 2.50 * 1.05 + time * 0.26, vec3(0.40, 0.41, 0.53), vec3(0.43, 0.49, 0.47), vec3(0.98, 1.24, 1.22), vec3(0.90, 0.42, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
