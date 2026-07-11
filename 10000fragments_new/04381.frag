uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.16 * sin(time * 0.86), 0.16 + 0.18 * cos(time * 1.33));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.33, 0.26)));
	}
	float v = exp(-trap * 3.08);
	float cc = clamp(0.5 + 0.5 * v * 3.52, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.23, 0.38), vec3(0.67, 0.71, 0.59), cc);
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
