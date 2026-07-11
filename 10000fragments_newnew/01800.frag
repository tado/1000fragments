uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.13 * sin(time * 0.55), -0.26 + 0.13 * cos(time * 0.75));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.14);
	vec3 col = vec3(0.37, 0.69, 0.37) * (0.24 / (abs(v * 1.94) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
