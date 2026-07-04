uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.26 * sin(time * 0.73), 0.24 + 0.29 * cos(time * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.07);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.81 * 4.12 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
