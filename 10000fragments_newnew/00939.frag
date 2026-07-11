uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.23 * sin(time * 1.40), 0.35 + 0.11 * cos(time * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.92);
	vec3 col = palette(v * 3.03 * 0.87 + time * 0.33, vec3(0.49, 0.52, 0.56), vec3(0.36, 0.31, 0.37), vec3(1.05, 0.85, 1.10), vec3(0.72, 0.13, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
