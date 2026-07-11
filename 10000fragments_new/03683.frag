uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.28 * sin(time * 1.58), -0.01 + 0.21 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.17);
	vec3 col = vec3(0.93, 0.37, 0.52) * (0.22 / (abs(v * 4.00) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
