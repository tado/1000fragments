uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * 0.40) * p;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.06 * sin(time * 1.69), 0.32 + 0.11 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.14);
	vec3 col = palette(v * 2.03 * 1.15 + time * 0.15, vec3(0.57, 0.50, 0.41), vec3(0.33, 0.48, 0.40), vec3(1.09, 0.99, 0.71), vec3(0.95, 0.74, 0.72));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
