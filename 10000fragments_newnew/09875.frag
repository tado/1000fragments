uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.21 * sin(time * 1.12), 0.22 + 0.06 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.18, -0.40)));
	}
	float v = exp(-trap * 2.12);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.81 * 1.51 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
