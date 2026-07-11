uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.11 * sin(time * 0.83), -0.06 + 0.22 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.03, 0.26)));
	}
	float v = exp(-trap * 2.99);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.67 * 4.08 + time * 0.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
