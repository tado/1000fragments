uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.09 * sin(time * 0.87), 0.29 + 0.29 * cos(time * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.00);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.23 * 4.95 + time * 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
