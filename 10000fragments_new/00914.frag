uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	p = rot2(time * 1.36) * p;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.15 * sin(time * 1.08), 0.28 + 0.09 * cos(time * 0.81));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.42);
	vec3 col = palette(v * 3.27 * 0.61 + time * 0.28, vec3(0.54, 0.55, 0.55), vec3(0.47, 0.46, 0.41), vec3(1.35, 0.79, 1.03), vec3(0.07, 0.95, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
