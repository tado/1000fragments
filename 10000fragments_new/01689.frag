uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.12 * sin(time * 0.77), 0.02 + 0.09 * cos(time * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.40, 0.23)));
	}
	float v = exp(-trap * 2.15);
	float cc = clamp(0.5 + 0.5 * v * 2.71, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.09, 0.42), vec3(0.61, 0.69, 0.52), cc);
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
