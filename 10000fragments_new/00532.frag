uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec2 z = p;
	vec2 c = vec2(0.02 + 0.23 * sin(time * 1.26), -0.02 + 0.25 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.98);
	float cc = clamp(0.5 + 0.5 * v * 3.82, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.09, 0.31), vec3(0.90, 0.67, 0.80), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
