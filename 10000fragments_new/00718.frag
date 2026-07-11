uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	p = rot2(time * 0.44) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.20 * sin(time * 1.75), 0.17 + 0.26 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.00);
	vec3 col = palette(v * 3.24 * 1.45 + time * 0.27, vec3(0.41, 0.51, 0.56), vec3(0.43, 0.31, 0.44), vec3(1.34, 1.10, 1.21), vec3(0.80, 0.26, 0.28));
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
