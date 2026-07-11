uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * 0.87) * p;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.09 * sin(time * 0.72), 0.38 + 0.21 * cos(time * 1.33));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.72);
	vec3 col = palette(v * 3.06 * 0.88 + time * 0.10, vec3(0.50, 0.54, 0.48), vec3(0.33, 0.47, 0.35), vec3(1.26, 1.35, 1.26), vec3(0.30, 0.13, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
