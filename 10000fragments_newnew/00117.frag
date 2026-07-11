uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = rot2(time * 0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.10 * sin(time * 0.98), 0.60 + 0.27 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.60);
	vec3 col = palette(v * 3.29 * 0.67 + time * 0.27, vec3(0.47, 0.51, 0.42), vec3(0.38, 0.45, 0.44), vec3(0.97, 1.31, 1.30), vec3(0.93, 0.27, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
