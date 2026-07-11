uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2(time * 0.90) * p;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.09 * sin(time * 1.36), 0.53 + 0.13 * cos(time * 1.29));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.49);
	vec3 col = palette(v * 1.93 * 1.32 + time * 0.14, vec3(0.58, 0.42, 0.58), vec3(0.41, 0.33, 0.45), vec3(1.04, 0.71, 1.14), vec3(0.63, 0.03, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
