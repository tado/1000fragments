uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.21 * sin(time * 1.01), 0.46 + 0.11 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.44);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.61 * 2.80 + time * 0.20);
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
