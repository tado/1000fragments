uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.30 * sin(time * 1.52), 0.10 + 0.23 * cos(time * 0.71));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.01);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.70 * 3.42 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
