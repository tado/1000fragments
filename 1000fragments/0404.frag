uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.13 * sin(time * 0.63), -0.14 + 0.18 * cos(time * 1.46));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.85);
	vec3 col = palette(v * 3.19 * 1.36 + time * 0.21, vec3(0.59, 0.43, 0.49), vec3(0.32, 0.48, 0.35), vec3(1.36, 1.04, 1.00), vec3(0.30, 0.51, 0.18));
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
