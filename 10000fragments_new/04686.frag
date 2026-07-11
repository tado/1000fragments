uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = rot2(time * -1.19) * p;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.28 * sin(time * 0.66), -0.55 + 0.22 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.05);
	vec3 col = palette(v * 2.71 * 1.47 + time * 0.21, vec3(0.56, 0.50, 0.48), vec3(0.42, 0.44, 0.49), vec3(0.96, 1.04, 1.35), vec3(0.28, 0.51, 0.14));
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
