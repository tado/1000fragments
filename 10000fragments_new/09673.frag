uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p = rot2(time * 1.40) * p;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.26 * sin(time * 1.80), -0.43 + 0.23 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.83);
	vec3 col = palette(v * 3.43 * 1.07 + time * 0.29, vec3(0.53, 0.60, 0.59), vec3(0.41, 0.44, 0.43), vec3(0.78, 0.96, 1.26), vec3(0.15, 0.51, 0.53));
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
