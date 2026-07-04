uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.08 * sin(time * 1.02), -0.20 + 0.26 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.38);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.81 * 2.75 + time * 0.94);
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
