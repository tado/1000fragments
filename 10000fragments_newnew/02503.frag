uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	p = rot2(time * 0.61) * p;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.25 * sin(time * 1.41), -0.45 + 0.21 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.00);
	vec3 col = palette(v * 3.69 * 0.52 + time * 0.16, vec3(0.50, 0.49, 0.53), vec3(0.37, 0.42, 0.42), vec3(1.03, 0.74, 0.93), vec3(0.93, 0.06, 0.50));
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
