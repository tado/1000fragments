uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.09 * sin(time * 1.66), -0.12 + 0.23 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.71);
	vec3 col = palette(v * 3.46 * 1.37 + time * 0.10, vec3(0.59, 0.48, 0.52), vec3(0.49, 0.32, 0.32), vec3(0.97, 1.37, 1.11), vec3(0.05, 0.79, 0.22));
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
