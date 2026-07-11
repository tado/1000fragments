uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.22 * sin(time * 1.11), -0.44 + 0.21 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.15);
	vec3 col = palette(v * 2.51 * 0.54 + time * 0.17, vec3(0.44, 0.40, 0.46), vec3(0.43, 0.48, 0.42), vec3(1.36, 0.82, 0.93), vec3(0.77, 0.62, 0.83));
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
