uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	vec2 z = p;
	vec2 c = vec2(0.10 + 0.29 * sin(time * 0.81), 0.30 + 0.07 * cos(time * 1.22));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.28);
	vec3 col = vec3(0.87, 0.66, 0.75) * (0.24 / (abs(v * 2.40) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
