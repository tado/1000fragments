uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	vec2 z = p;
	vec2 c = vec2(-0.56 + 0.20 * sin(time * 0.51), 0.47 + 0.15 * cos(time * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.45);
	float cc = clamp(0.5 + 0.5 * v * 3.65, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.17, 0.40), vec3(0.67, 0.96, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
