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
	p = rot2(time * 1.52) * p;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.09 * sin(time * 1.72), -0.51 + 0.23 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.61);
	vec3 col = palette(v * 1.51 * 1.08 + time * 0.30, vec3(0.52, 0.59, 0.46), vec3(0.50, 0.36, 0.38), vec3(1.26, 1.34, 1.33), vec3(0.39, 0.57, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
