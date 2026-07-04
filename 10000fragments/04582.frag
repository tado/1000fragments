uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	p = rot2(time * 1.33) * p;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.20 * sin(time * 0.99), 0.54 + 0.28 * cos(time * 1.12));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.73);
	vec3 col = palette(v * 3.63 * 1.33 + time * 0.01, vec3(0.50, 0.59, 0.52), vec3(0.42, 0.36, 0.41), vec3(0.95, 0.84, 0.93), vec3(0.61, 0.51, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
