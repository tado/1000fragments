uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	p = rot2(time * 1.54) * p;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.19 * sin(time * 0.72), 0.17 + 0.20 * cos(time * 1.07));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.79);
	vec3 col = palette(v * 3.59 * 0.60 + time * 0.08, vec3(0.55, 0.45, 0.56), vec3(0.45, 0.40, 0.48), vec3(1.39, 0.80, 1.40), vec3(0.42, 0.80, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
