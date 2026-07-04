uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.11 * sin(time * 0.79), 0.20 + 0.19 * cos(time * 0.77));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.60);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.57 * 3.73 + time * 0.85);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
