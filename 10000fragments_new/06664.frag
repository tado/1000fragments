uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	p = rot2(time * 0.96) * p;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.20 * sin(time * 1.84), 0.38 + 0.18 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.03);
	vec3 col = palette(v * 3.95 * 1.43 + time * 0.01, vec3(0.58, 0.42, 0.60), vec3(0.43, 0.48, 0.39), vec3(0.71, 1.26, 0.84), vec3(0.35, 0.69, 0.82));
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
