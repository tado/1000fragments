uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = rot2(time * 0.35) * p;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.18 * sin(time * 1.50), 0.19 + 0.26 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.15);
	vec3 col = palette(v * 3.68 * 1.33 + time * 0.37, vec3(0.45, 0.47, 0.57), vec3(0.49, 0.46, 0.42), vec3(0.99, 0.80, 0.75), vec3(0.04, 0.30, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
