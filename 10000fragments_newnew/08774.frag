uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.11 * sin(time * 0.53), 0.19 + 0.27 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.29, 0.07)));
	}
	float v = exp(-trap * 1.60);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.35 * 4.62 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
