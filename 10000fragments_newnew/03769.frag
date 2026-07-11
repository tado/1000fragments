uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.27 * sin(time * 1.57), 0.28 + 0.09 * cos(time * 0.70));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.99);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.09 * 2.37 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
