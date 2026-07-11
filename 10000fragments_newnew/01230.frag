uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	p = rot2(time * 0.90) * p;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.14 * sin(time * 0.61), -0.27 + 0.23 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.56);
	vec3 col = palette(v * 3.86 * 0.91 + time * 0.24, vec3(0.56, 0.48, 0.52), vec3(0.35, 0.42, 0.34), vec3(1.21, 1.30, 1.19), vec3(0.96, 0.59, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
