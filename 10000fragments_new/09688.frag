uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	p = rot2(time * -1.56) * p;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.11 * sin(time * 1.91), 0.47 + 0.14 * cos(time * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, 0.11)));
	}
	float v = exp(-trap * 3.29);
	vec3 col = palette(v * 1.50 * 1.07 + time * 0.27, vec3(0.48, 0.49, 0.51), vec3(0.46, 0.33, 0.48), vec3(1.11, 1.00, 1.07), vec3(0.73, 0.02, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
