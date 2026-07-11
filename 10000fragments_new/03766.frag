uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.20 * sin(time * 1.46), -0.48 + 0.05 * cos(time * 1.01));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.58);
	float cc = clamp(0.5 + 0.5 * v * 1.63, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.14, 0.43), vec3(0.69, 0.96, 0.42), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
