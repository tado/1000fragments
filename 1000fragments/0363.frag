uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.21 * sin(time * 1.70), -0.39 + 0.05 * cos(time * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.45);
	float cc = clamp(0.5 + 0.5 * v * 1.78, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.32, 0.43), vec3(0.63, 0.95, 0.93), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
