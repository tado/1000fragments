uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	vec2 z = p;
	vec2 c = vec2(-0.82 + 0.11 * sin(time * 1.79), 0.55 + 0.29 * cos(time * 0.63));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.27, -0.26)));
	}
	float v = exp(-trap * 2.41);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.64 * 4.74 + time * 0.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
