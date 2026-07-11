uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.15 * sin(time * 1.17), 0.26 + 0.16 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.73);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.58 * 1.69 + time * 0.96);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
