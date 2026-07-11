uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.25 * sin(time * 1.09), -0.55 + 0.13 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.09);
	float cc = clamp(0.5 + 0.5 * v * 3.81, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.32, 0.17), vec3(0.61, 0.72, 0.62), cc);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.88 + time * 15.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
