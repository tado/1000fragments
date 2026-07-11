uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.20 * sin(time * 0.78), -0.05 + 0.17 * cos(time * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.29);
	float cc = clamp(0.5 + 0.5 * v * 3.03, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.34, 0.35), vec3(0.84, 0.67, 0.92), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
