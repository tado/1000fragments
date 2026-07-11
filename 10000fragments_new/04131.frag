uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.06 * sin(time * 1.64), -0.44 + 0.22 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.82);
	float cc = clamp(0.5 + 0.5 * v * 2.15, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.06, 0.35), vec3(0.98, 0.94, 0.45), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
