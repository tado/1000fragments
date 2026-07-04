uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	vec2 z = p;
	vec2 c = vec2(-0.18 + 0.29 * sin(time * 1.08), 0.23 + 0.18 * cos(time * 1.49));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.94);
	float cc = clamp(0.5 + 0.5 * v * 1.61, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.17, 0.15), vec3(0.56, 0.85, 0.41), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
