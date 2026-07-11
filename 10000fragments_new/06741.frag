uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec2 z = p;
	vec2 c = vec2(-0.69 + 0.13 * sin(time * 0.80), -0.33 + 0.27 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.80);
	float cc = clamp(0.5 + 0.5 * v * 3.84, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.09, 0.16), vec3(0.83, 0.68, 0.88), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
