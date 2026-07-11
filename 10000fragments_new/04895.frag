uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = rot2(time * 0.62) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.22 * sin(time * 1.01), -0.15 + 0.17 * cos(time * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.95);
	vec3 col = palette(v * 1.56 * 0.64 + time * 0.12, vec3(0.41, 0.43, 0.46), vec3(0.49, 0.30, 0.34), vec3(1.09, 1.09, 1.11), vec3(0.49, 0.19, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
