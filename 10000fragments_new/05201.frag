uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.13 * sin(time * 0.65), 0.23 + 0.14 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.23);
	float cc = clamp(0.5 + 0.5 * v * 2.40, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.22, 0.47), vec3(0.90, 0.73, 0.80), cc);
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 1.44 + time * 17.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
