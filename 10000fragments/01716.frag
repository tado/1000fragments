uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec2 z = p;
	vec2 c = vec2(-0.00 + 0.27 * sin(time * 1.02), 0.55 + 0.11 * cos(time * 1.46));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.98);
	vec3 col = palette(v * 2.37 * 1.41 + time * 0.21, vec3(0.50, 0.51, 0.60), vec3(0.43, 0.39, 0.36), vec3(1.21, 1.37, 0.77), vec3(0.95, 0.01, 0.91));
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 2.16 + time * 8.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
