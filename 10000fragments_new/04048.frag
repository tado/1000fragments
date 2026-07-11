uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec2 z = p;
	vec2 c = vec2(-0.28 + 0.06 * sin(time * 1.88), 0.58 + 0.25 * cos(time * 1.48));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.25);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.85 * 3.69 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
