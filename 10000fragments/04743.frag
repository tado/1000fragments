uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 z = p;
	vec2 c = vec2(0.14 + 0.10 * sin(time * 1.64), 0.43 + 0.15 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, -0.09)));
	}
	float v = exp(-trap * 2.11);
	vec3 col = vec3(0.83, 0.27, 0.65) * (0.22 / (abs(v * 2.47) + 0.02));
	col = col / (1.0 + col);
	col *= 0.80 + 0.19 * sin(gl_FragCoord.y * 1.47 + time * 16.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
