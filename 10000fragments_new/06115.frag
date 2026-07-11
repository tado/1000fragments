uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * 1.55) * p;
	vec2 z = p;
	vec2 c = vec2(-0.52 + 0.24 * sin(time * 0.61), -0.27 + 0.13 * cos(time * 0.63));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.20);
	vec3 col = palette(v * 2.12 * 1.03 + time * 0.27, vec3(0.41, 0.43, 0.60), vec3(0.47, 0.33, 0.46), vec3(0.93, 0.91, 0.84), vec3(0.11, 0.62, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
