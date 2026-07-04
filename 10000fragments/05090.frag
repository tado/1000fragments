uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.23 * sin(time * 1.88), 0.17 + 0.06 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.88);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.57 * 1.71 + time * 0.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
