uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -0.73) * p;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.22 * sin(time * 1.37), -0.19 + 0.28 * cos(time * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.02, 0.12)));
	}
	float v = exp(-trap * 2.26);
	vec3 col = palette(v * 3.94 * 1.38 + time * 0.07, vec3(0.57, 0.59, 0.57), vec3(0.45, 0.43, 0.34), vec3(0.96, 1.36, 1.32), vec3(0.17, 0.50, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
