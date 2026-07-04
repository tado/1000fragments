uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = rot2(time * 0.93) * p;
	vec2 z = p;
	vec2 c = vec2(0.02 + 0.22 * sin(time * 1.02), 0.30 + 0.19 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.42, -0.39)));
	}
	float v = exp(-trap * 4.29);
	vec3 col = palette(v * 2.70 * 1.03 + time * 0.08, vec3(0.45, 0.59, 0.46), vec3(0.38, 0.34, 0.34), vec3(0.85, 1.06, 1.17), vec3(0.63, 0.93, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
