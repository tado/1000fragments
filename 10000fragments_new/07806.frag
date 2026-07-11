uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * -1.14) * p;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.07 * sin(time * 1.22), -0.40 + 0.21 * cos(time * 1.12));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.74);
	vec3 col = palette(v * 2.10 * 0.44 + time * 0.39, vec3(0.53, 0.54, 0.48), vec3(0.32, 0.32, 0.49), vec3(0.98, 1.05, 0.86), vec3(0.61, 0.83, 0.01));
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
