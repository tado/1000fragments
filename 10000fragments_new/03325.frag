uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.23 * sin(time * 0.86), 0.11 + 0.18 * cos(time * 0.62));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.16, -0.44)));
	}
	float v = exp(-trap * 2.07);
	vec3 col = vec3(0.96, 0.37, 0.43) * (0.19 / (abs(v * 3.51) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
