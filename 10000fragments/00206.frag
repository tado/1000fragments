uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.24 * sin(time * 1.96), -0.09 + 0.28 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.98);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.72 * 2.04 + time * 0.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
