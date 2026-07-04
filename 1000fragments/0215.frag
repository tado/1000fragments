uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * -0.89) * p;
	vec2 z = p;
	vec2 c = vec2(-0.84 + 0.23 * sin(time * 1.59), -0.57 + 0.06 * cos(time * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.47);
	vec3 col = palette(v * 1.83 * 1.12 + time * 0.24, vec3(0.41, 0.50, 0.56), vec3(0.41, 0.36, 0.35), vec3(1.16, 1.25, 1.35), vec3(0.60, 0.51, 0.61));
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
