uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec2 z = p;
	vec2 c = vec2(-0.23 + 0.23 * sin(time * 1.61), -0.01 + 0.17 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.85);
	vec3 col = palette(v * 3.00 * 0.63 + time * 0.33, vec3(0.45, 0.44, 0.44), vec3(0.32, 0.48, 0.32), vec3(1.23, 1.07, 0.84), vec3(0.73, 0.32, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
