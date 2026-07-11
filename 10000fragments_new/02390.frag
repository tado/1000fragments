uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.18 * sin(time * 1.57), -0.24 + 0.20 * cos(time * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.98);
	float cc = clamp(0.5 + 0.5 * v * 1.75, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.11, 0.35), vec3(0.59, 0.80, 0.59), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
