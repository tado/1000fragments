uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2(time * 1.29) * p;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.15 * sin(time * 1.62), 0.20 + 0.27 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.38);
	vec3 col = palette(v * 3.91 * 1.11 + time * 0.35, vec3(0.48, 0.57, 0.58), vec3(0.44, 0.46, 0.47), vec3(1.39, 1.37, 1.34), vec3(0.78, 0.65, 0.72));
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
