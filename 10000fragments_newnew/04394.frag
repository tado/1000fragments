uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(0.30 + 0.06 * sin(time * 1.02), 0.45 + 0.18 * cos(time * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.36, 0.29)));
	}
	float v = exp(-trap * 3.06);
	float cc = clamp(0.5 + 0.5 * v * 3.45, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.19, 0.48), vec3(0.99, 0.72, 0.70), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.55 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
