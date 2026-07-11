uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * -1.52) * p;
	vec2 z = p;
	vec2 c = vec2(0.30 + 0.10 * sin(time * 1.13), -0.41 + 0.19 * cos(time * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.94);
	vec3 col = palette(v * 3.45 * 0.94 + time * 0.20, vec3(0.57, 0.60, 0.53), vec3(0.39, 0.42, 0.48), vec3(0.94, 1.18, 0.77), vec3(0.91, 0.27, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
