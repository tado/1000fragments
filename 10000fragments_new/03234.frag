uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.11 * sin(time * 1.41), -0.14 + 0.13 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.73);
	vec3 col = vec3(0.43, 0.88, 0.17) * (0.15 / (abs(v * 3.14) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
