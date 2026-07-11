uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	vec2 z = p;
	vec2 c = vec2(-0.32 + 0.24 * sin(time * 0.53), 0.54 + 0.12 * cos(time * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.56);
	vec3 col = palette(v * 1.63 * 0.64 + time * 0.04, vec3(0.43, 0.56, 0.49), vec3(0.37, 0.43, 0.43), vec3(1.30, 1.21, 0.77), vec3(0.60, 0.51, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
