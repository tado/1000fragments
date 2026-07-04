uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2(time * -0.80) * p;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.28 * sin(time * 1.80), 0.40 + 0.23 * cos(time * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.63);
	vec3 col = palette(v * 3.25 * 0.89 + time * 0.36, vec3(0.40, 0.46, 0.41), vec3(0.47, 0.48, 0.41), vec3(0.76, 1.18, 0.84), vec3(0.71, 0.37, 0.07));
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
