uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -0.66) * p;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.19 * sin(time * 1.01), 0.39 + 0.07 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.70);
	vec3 col = palette(v * 3.32 * 1.18 + time * 0.32, vec3(0.52, 0.56, 0.52), vec3(0.47, 0.32, 0.46), vec3(1.31, 1.30, 1.29), vec3(0.26, 0.22, 0.09));
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
