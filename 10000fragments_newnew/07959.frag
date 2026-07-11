uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.13 * sin(time * 1.54), 0.34 + 0.15 * cos(time * 1.03));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, -0.40)));
	}
	float v = exp(-trap * 3.24);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.95 * 2.74 + time * 0.27);
	col = mod(col * 1.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
