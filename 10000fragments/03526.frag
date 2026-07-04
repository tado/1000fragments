uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.11 * sin(time * 0.76), -0.04 + 0.08 * cos(time * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.72);
	vec3 col = palette(v * 1.68 * 1.15 + time * 0.19, vec3(0.42, 0.49, 0.44), vec3(0.43, 0.45, 0.35), vec3(0.89, 1.10, 0.85), vec3(0.11, 0.52, 0.33));
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 0.83 + time * 9.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
