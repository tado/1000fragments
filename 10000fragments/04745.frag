uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2(time * 0.94) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.29 * sin(time * 1.35), 0.36 + 0.21 * cos(time * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.78);
	vec3 col = palette(v * 2.43 * 1.04 + time * 0.12, vec3(0.48, 0.49, 0.56), vec3(0.30, 0.38, 0.45), vec3(1.08, 0.85, 0.81), vec3(0.91, 0.38, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
