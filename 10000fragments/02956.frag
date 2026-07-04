uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	p = rot2(time * 0.70) * p;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.07 * sin(time * 1.84), -0.56 + 0.10 * cos(time * 1.26));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.93);
	vec3 col = palette(v * 3.95 * 0.67 + time * 0.05, vec3(0.53, 0.41, 0.51), vec3(0.34, 0.37, 0.48), vec3(0.86, 0.74, 1.33), vec3(0.20, 0.42, 0.35));
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
