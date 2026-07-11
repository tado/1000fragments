uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	p = rot2(time * 0.86) * p;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.08 * sin(time * 1.25), -0.06 + 0.13 * cos(time * 1.25));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.96);
	vec3 col = palette(v * 4.00 * 1.29 + time * 0.03, vec3(0.54, 0.53, 0.43), vec3(0.46, 0.37, 0.38), vec3(1.14, 1.30, 0.82), vec3(0.13, 0.69, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
