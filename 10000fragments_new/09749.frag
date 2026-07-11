uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.29 * sin(time * 1.14), 0.52 + 0.25 * cos(time * 0.61));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.10);
	float cc = clamp(0.5 + 0.5 * v * 3.18, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.19, 0.20), vec3(0.58, 0.77, 0.61), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
