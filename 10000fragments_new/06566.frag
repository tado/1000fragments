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
	vec2 c = vec2(-0.77 + 0.25 * sin(time * 1.28), 0.35 + 0.19 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.70);
	vec3 col = palette(v * 1.55 * 1.38 + time * 0.00, vec3(0.45, 0.47, 0.59), vec3(0.37, 0.39, 0.49), vec3(0.77, 1.26, 0.77), vec3(0.68, 0.20, 0.69));
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 1.18 + time * 4.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
