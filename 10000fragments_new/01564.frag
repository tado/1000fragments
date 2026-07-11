uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.41 + 0.24 * sin(time * 1.01), 0.44 + 0.24 * cos(time * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.98);
	vec3 col = palette(v * 2.00 * 0.47 + time * 0.19, vec3(0.43, 0.45, 0.42), vec3(0.44, 0.42, 0.33), vec3(0.73, 0.93, 0.98), vec3(0.26, 0.75, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
