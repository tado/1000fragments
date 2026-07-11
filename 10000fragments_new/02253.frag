uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.06 * sin(time * 0.76), -0.28 + 0.08 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.61);
	vec3 col = vec3(0.24, 0.72, 0.88) * (0.08 / (abs(v * 2.91) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
