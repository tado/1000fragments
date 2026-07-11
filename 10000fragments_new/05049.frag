uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.09 * sin(time * 1.14), 0.52 + 0.21 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.01);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.84 * 3.12 + time * 0.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
