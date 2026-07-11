uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.16 * sin(time * 1.03), -0.55 + 0.06 * cos(time * 0.45));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.62);
	vec3 col = vec3(0.63, 0.75, 0.75) * (0.07 / (abs(v * 3.78) + 0.07));
	col = col / (1.0 + col);
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 1.68 + time * 13.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
