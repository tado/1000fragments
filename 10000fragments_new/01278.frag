uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.26 * sin(time * 0.89), -0.04 + 0.28 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.39);
	vec3 col = palette(v * 1.88 * 0.94 + time * 0.20, vec3(0.55, 0.58, 0.44), vec3(0.30, 0.37, 0.45), vec3(0.78, 1.20, 0.89), vec3(0.20, 0.29, 0.41));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
