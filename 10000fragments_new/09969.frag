uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p = rot2(time * 1.35) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.14 * sin(time * 1.14), -0.17 + 0.07 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.02, 0.47)));
	}
	float v = exp(-trap * 2.43);
	vec3 col = palette(v * 3.85 * 1.22 + time * 0.34, vec3(0.45, 0.52, 0.48), vec3(0.48, 0.40, 0.32), vec3(0.93, 1.36, 1.16), vec3(1.00, 0.48, 0.03));
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
