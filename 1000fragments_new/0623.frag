uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.27 * sin(time * 1.69), 0.33 + 0.12 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.73);
	vec3 col = palette(v * 1.77 * 0.44 + time * 0.04, vec3(0.46, 0.60, 0.49), vec3(0.50, 0.43, 0.50), vec3(1.07, 1.28, 1.15), vec3(0.50, 0.76, 0.65));
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.69 + time * 4.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
