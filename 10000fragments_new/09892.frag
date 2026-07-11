uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.24 * sin(time * 0.98), 0.01 + 0.29 * cos(time * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.10);
	vec3 col = vec3(0.5 + 0.5 * v * 1.57) * vec3(0.96, 0.55, 0.61) + vec3(0.09, 0.22, 0.17);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.65 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
