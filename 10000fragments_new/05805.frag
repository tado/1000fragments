uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.14 * sin(time * 1.59), -0.15 + 0.23 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.01, -0.00)));
	}
	float v = exp(-trap * 2.67);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.46 * 3.75 + time * 0.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
