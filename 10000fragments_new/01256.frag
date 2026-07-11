uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.26 * sin(time * 0.71), -0.21 + 0.08 * cos(time * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.66);
	vec3 col = palette(v * 2.67 * 0.47 + time * 0.10, vec3(0.44, 0.51, 0.43), vec3(0.36, 0.40, 0.30), vec3(1.38, 1.33, 1.28), vec3(0.50, 0.39, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
