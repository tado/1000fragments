uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.14 * sin(time * 0.58), -0.15 + 0.18 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.66);
	vec3 col = palette(v * 1.69 * 0.50 + time * 0.06, vec3(0.54, 0.43, 0.58), vec3(0.43, 0.47, 0.42), vec3(1.32, 0.74, 1.15), vec3(0.26, 0.33, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
