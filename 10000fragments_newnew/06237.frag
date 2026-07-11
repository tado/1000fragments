uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	vec2 z = p;
	vec2 c = vec2(-0.87 + 0.24 * sin(time * 1.75), 0.15 + 0.22 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.16);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.59 * 2.43 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
