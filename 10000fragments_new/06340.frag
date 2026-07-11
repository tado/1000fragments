uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.20 * sin(time * 1.40), 0.58 + 0.29 * cos(time * 1.04));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.15);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.98 * 1.68 + time * 0.35);
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
