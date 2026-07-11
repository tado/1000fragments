uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec2 z = p;
	vec2 c = vec2(-0.09 + 0.19 * sin(time * 0.73), -0.43 + 0.28 * cos(time * 0.40));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.70);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.63 * 3.37 + time * 0.18);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.86 + time * 14.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
