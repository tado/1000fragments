uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.26 * sin(time * 0.84), -0.20 + 0.19 * cos(time * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.45);
	float cc = clamp(0.5 + 0.5 * v * 1.80, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.39, 0.22), vec3(0.86, 0.78, 0.93), cc);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
