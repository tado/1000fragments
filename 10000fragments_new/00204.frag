uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	p = rot2(time * -0.79) * p;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.25 * sin(time * 0.61), 0.06 + 0.26 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, -0.23)));
	}
	float v = exp(-trap * 5.17);
	vec3 col = palette(v * 1.80 * 0.44 + time * 0.26, vec3(0.46, 0.49, 0.48), vec3(0.42, 0.40, 0.33), vec3(1.08, 0.96, 1.01), vec3(0.59, 0.07, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
