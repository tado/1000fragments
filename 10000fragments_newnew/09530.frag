uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	p = rot2(time * 0.64) * p;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.11 * sin(time * 1.64), -0.18 + 0.12 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.70);
	vec3 col = palette(v * 1.61 * 1.42 + time * 0.09, vec3(0.45, 0.55, 0.51), vec3(0.42, 0.38, 0.41), vec3(1.08, 1.28, 1.23), vec3(0.20, 0.69, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
