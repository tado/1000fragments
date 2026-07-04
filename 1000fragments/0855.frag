uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.17 * sin(time * 1.23), 0.02 + 0.17 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.47);
	vec3 col = vec3(0.21, 0.64, 0.35) * (0.22 / (abs(v * 2.98) + 0.06));
	col = col / (1.0 + col);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.98 + time * 11.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
