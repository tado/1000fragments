uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.28 * sin(time * 1.60), 0.55 + 0.16 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.99);
	float cc = clamp(0.5 + 0.5 * v * 1.52, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.06, 0.50), vec3(0.98, 0.92, 0.42), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
