uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.29 * sin(time * 1.36), -0.03 + 0.21 * cos(time * 1.42));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.43);
	vec3 col = palette(v * 2.16 * 1.09 + time * 0.18, vec3(0.50, 0.54, 0.60), vec3(0.43, 0.47, 0.32), vec3(0.81, 1.02, 0.75), vec3(0.94, 0.73, 0.10));
	col *= 0.89 + 0.13 * sin(gl_FragCoord.y * 2.43 + time * 11.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
