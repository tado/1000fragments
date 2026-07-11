uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	p = rot2(time * 0.89) * p;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.19 * sin(time * 1.60), -0.21 + 0.25 * cos(time * 0.45));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.57);
	vec3 col = palette(v * 2.92 * 1.47 + time * 0.36, vec3(0.52, 0.55, 0.45), vec3(0.32, 0.49, 0.35), vec3(1.02, 1.38, 0.73), vec3(0.17, 0.43, 1.00));
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
