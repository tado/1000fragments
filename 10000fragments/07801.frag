uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.10 * sin(time * 0.72), 0.03 + 0.08 * cos(time * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.49);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.81 * 2.08 + time * 0.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
