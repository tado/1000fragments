uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.28 * sin(time * 0.69), -0.12 + 0.06 * cos(time * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.85);
	vec3 col = vec3(0.60, 0.61, 0.35) * (0.22 / (abs(v * 3.17) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
