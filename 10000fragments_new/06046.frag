uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.18 * sin(time * 1.96), 0.53 + 0.13 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.88);
	vec3 col = vec3(0.41, 0.44, 0.34) * (0.16 / (abs(v * 3.62) + 0.09));
	col = col / (1.0 + col);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 2.96 + time * 9.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
