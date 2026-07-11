uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.11 * sin(time * 1.56), -0.27 + 0.19 * cos(time * 1.60));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.08);
	float cc = clamp(0.5 + 0.5 * v * 2.98, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.15, 0.48), vec3(0.92, 0.94, 0.77), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
