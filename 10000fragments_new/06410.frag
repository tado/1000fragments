uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.29 * sin(time * 0.72), 0.42 + 0.15 * cos(time * 0.96));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.54);
	vec3 col = palette(v * 2.05 * 0.51 + time * 0.10, vec3(0.50, 0.43, 0.57), vec3(0.40, 0.31, 0.40), vec3(1.18, 0.95, 0.78), vec3(0.41, 0.77, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
