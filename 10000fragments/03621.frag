uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.24 * sin(time * 0.82), 0.51 + 0.23 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.13);
	float cc = clamp(0.5 + 0.5 * v * 3.13, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.00, 0.26), vec3(0.59, 0.76, 0.55), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
