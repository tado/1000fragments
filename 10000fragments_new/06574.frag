uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.26 * sin(time * 1.34), 0.10 + 0.20 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.17, 0.23)));
	}
	float v = exp(-trap * 5.53);
	float cc = clamp(0.5 + 0.5 * v * 3.03, 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.13, 0.18), vec3(0.94, 0.55, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
