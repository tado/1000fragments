uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.20 * sin(time * 1.07), 0.14 + 0.16 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.02);
	vec3 col = palette(v * 3.28 * 1.23 + time * 0.26, vec3(0.57, 0.45, 0.50), vec3(0.47, 0.47, 0.33), vec3(1.08, 1.31, 0.87), vec3(0.91, 0.71, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
