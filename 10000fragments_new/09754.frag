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
	vec2 c = vec2(0.01 + 0.19 * sin(time * 1.61), -0.21 + 0.12 * cos(time * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.07);
	vec3 col = palette(v * 3.39 * 0.65 + time * 0.32, vec3(0.49, 0.44, 0.43), vec3(0.33, 0.30, 0.37), vec3(0.89, 1.12, 1.38), vec3(0.30, 0.17, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
