uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.10 * sin(time * 1.11), 0.17 + 0.07 * cos(time * 1.25));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.56);
	vec3 col = palette(v * 1.70 * 0.61 + time * 0.01, vec3(0.43, 0.47, 0.54), vec3(0.38, 0.45, 0.43), vec3(0.96, 1.04, 0.89), vec3(0.26, 0.76, 0.47));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
