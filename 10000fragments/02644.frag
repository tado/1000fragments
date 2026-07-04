uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.23 * sin(time * 0.55), -0.56 + 0.09 * cos(time * 1.50));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.38, 0.03)));
	}
	float v = exp(-trap * 2.80);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.21 * 4.43 + time * 0.71);
	col *= 0.82 + 0.20 * sin(gl_FragCoord.y * 2.94 + time * 15.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
