uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.23 * sin(time * 1.82), -0.22 + 0.11 * cos(time * 1.02));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.99);
	vec3 col = palette(v * 2.00 * 0.53 + time * 0.29, vec3(0.46, 0.46, 0.40), vec3(0.43, 0.35, 0.43), vec3(0.80, 0.86, 1.23), vec3(0.77, 0.15, 0.83));
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 2.39 + time * 15.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
