uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.16 * sin(time * 0.95), 0.49 + 0.17 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.71);
	vec3 col = vec3(0.5 + 0.5 * v * 2.55) * vec3(1.46, 1.34, 0.91) + vec3(0.04, 0.06, 0.17);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
