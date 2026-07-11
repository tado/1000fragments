uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(time * 1.22) * p;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.23 * sin(time * 0.60), -0.12 + 0.29 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.25);
	vec3 col = palette(v * 2.05 * 1.30 + time * 0.06, vec3(0.56, 0.48, 0.58), vec3(0.47, 0.43, 0.42), vec3(0.95, 0.70, 1.25), vec3(0.25, 0.31, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
