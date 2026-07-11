uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * -0.54) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.11 * sin(time * 1.57), 0.15 + 0.28 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.68);
	vec3 col = palette(v * 3.34 * 1.21 + time * 0.12, vec3(0.48, 0.46, 0.54), vec3(0.45, 0.32, 0.41), vec3(0.93, 0.71, 1.00), vec3(0.93, 0.57, 0.43));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
