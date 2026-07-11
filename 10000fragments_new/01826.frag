uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.13 * sin(time * 0.55), 0.03 + 0.22 * cos(time * 1.54));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.53);
	float cc = clamp(0.5 + 0.5 * v * 3.26, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.20, 0.11), vec3(0.80, 0.55, 0.99), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
