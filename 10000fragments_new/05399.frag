uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.28 * sin(time * 1.05), -0.55 + 0.23 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.46);
	vec3 col = palette(v * 3.46 * 1.37 + time * 0.06, vec3(0.48, 0.55, 0.60), vec3(0.42, 0.47, 0.39), vec3(1.25, 1.05, 1.18), vec3(0.11, 0.86, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
