uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(time * 1.59) * p;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.16 * sin(time * 1.54), -0.45 + 0.28 * cos(time * 0.79));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.43);
	vec3 col = palette(v * 2.82 * 1.29 + time * 0.34, vec3(0.51, 0.42, 0.50), vec3(0.35, 0.41, 0.48), vec3(0.93, 1.39, 0.92), vec3(0.67, 0.94, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
