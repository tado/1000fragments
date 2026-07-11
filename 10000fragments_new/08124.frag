uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(-0.42 + 0.25 * sin(time * 1.81), 0.45 + 0.26 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.41, 0.23)));
	}
	float v = exp(-trap * 5.20);
	vec3 col = vec3(0.68, 0.34, 0.59) * (0.21 / (abs(v * 1.98) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
