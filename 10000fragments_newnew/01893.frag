uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(time * -0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.07 * sin(time * 0.87), 0.04 + 0.09 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.45);
	vec3 col = palette(v * 3.18 * 0.67 + time * 0.23, vec3(0.57, 0.49, 0.41), vec3(0.34, 0.37, 0.32), vec3(0.75, 0.82, 0.80), vec3(0.26, 0.27, 0.94));
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 1.03 + time * 12.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
