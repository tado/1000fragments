uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.24 * sin(time * 1.74), -0.11 + 0.15 * cos(time * 1.47));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.01);
	vec3 col = vec3(0.75, 0.37, 0.47) * (0.12 / (abs(v * 3.01) + 0.09));
	col = col / (1.0 + col);
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
