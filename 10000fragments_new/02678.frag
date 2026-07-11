uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.63;
	vec2 z = p;
	vec2 c = vec2(0.13 + 0.14 * sin(time * 1.66), 0.58 + 0.19 * cos(time * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.20);
	vec3 col = palette(v * 3.98 * 0.41 + time * 0.15, vec3(0.51, 0.43, 0.60), vec3(0.44, 0.47, 0.43), vec3(0.79, 1.31, 1.22), vec3(0.04, 0.54, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
