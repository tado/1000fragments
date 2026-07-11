uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.06 * sin(time * 1.62), 0.12 + 0.27 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.55);
	vec3 col = palette(v * 3.83 * 0.60 + time * 0.32, vec3(0.50, 0.46, 0.43), vec3(0.33, 0.40, 0.42), vec3(1.20, 1.16, 0.73), vec3(0.79, 0.05, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
