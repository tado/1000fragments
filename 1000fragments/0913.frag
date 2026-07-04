uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.16 * sin(time * 1.93), -0.20 + 0.07 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.50);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.18 * 4.88 + time * 0.61);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.16 + time * 7.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
