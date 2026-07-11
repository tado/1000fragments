uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	p = rot2(time * 0.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.14 * sin(time * 1.40), 0.26 + 0.14 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.23);
	vec3 col = palette(v * 2.63 * 0.78 + time * 0.33, vec3(0.41, 0.42, 0.46), vec3(0.47, 0.48, 0.38), vec3(1.21, 1.20, 1.11), vec3(0.41, 0.39, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
