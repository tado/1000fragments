uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * -0.39) * p;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.14 * sin(time * 0.75), 0.51 + 0.20 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.60);
	vec3 col = palette(v * 2.23 * 1.25 + time * 0.05, vec3(0.58, 0.56, 0.44), vec3(0.48, 0.46, 0.45), vec3(1.40, 1.22, 0.70), vec3(0.78, 0.65, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
