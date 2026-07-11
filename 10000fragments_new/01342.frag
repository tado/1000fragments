uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.26 * sin(time * 1.47), 0.31 + 0.09 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.42);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.23 * 4.38 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
