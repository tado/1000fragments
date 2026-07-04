uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.23 * sin(time * 0.56), -0.53 + 0.13 * cos(time * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.26);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.24 * 3.13 + time * 0.25);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 2.00 + time * 12.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
