uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec2 z = p;
	vec2 c = vec2(-0.70 + 0.10 * sin(time * 0.79), 0.28 + 0.22 * cos(time * 0.43));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.56);
	vec3 col = vec3(0.25, 0.84, 0.55) * (0.07 / (abs(v * 3.82) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
