uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(-0.38 + 0.26 * sin(time * 1.60), 0.02 + 0.24 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.12);
	float cc = clamp(0.5 + 0.5 * v * 3.30, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.11, 0.08), vec3(0.96, 0.93, 0.88), cc);
	col = fract(col * 1.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
