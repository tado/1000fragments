uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2(time * 0.76) * p;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.20 * sin(time * 0.65), 0.14 + 0.08 * cos(time * 0.79));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.52);
	vec3 col = palette(v * 3.04 * 0.54 + time * 0.36, vec3(0.49, 0.45, 0.49), vec3(0.42, 0.35, 0.41), vec3(0.97, 1.21, 1.32), vec3(0.18, 0.20, 0.49));
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
