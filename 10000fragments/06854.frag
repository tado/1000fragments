uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.22 * sin(time * 1.22), -0.50 + 0.20 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.89);
	float cc = clamp(0.5 + 0.5 * v * 2.15, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.05, 0.44), vec3(0.82, 0.95, 0.52), cc);
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 2.40 + time * 4.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
