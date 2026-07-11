uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	p = rot2(time * 1.57) * p;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.19 * sin(time * 1.03), -0.05 + 0.27 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.26, 0.09)));
	}
	float v = exp(-trap * 2.28);
	vec3 col = palette(v * 2.82 * 0.49 + time * 0.26, vec3(0.46, 0.47, 0.42), vec3(0.38, 0.33, 0.35), vec3(1.21, 1.14, 1.32), vec3(0.17, 0.06, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
