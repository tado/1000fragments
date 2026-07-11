uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.12 * sin(time * 0.66), -0.25 + 0.21 * cos(time * 1.07));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.44, -0.43)));
	}
	float v = exp(-trap * 5.24);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.35 * 4.73 + time * 0.51);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
