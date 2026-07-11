uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.12 * sin(time * 1.76), 0.32 + 0.27 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.11, 0.04)));
	}
	float v = exp(-trap * 1.59);
	vec3 col = vec3(0.39, 0.46, 0.72) * (0.07 / (abs(v * 2.50) + 0.10));
	col = col / (1.0 + col);
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
