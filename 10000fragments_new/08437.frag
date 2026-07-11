uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 z = p;
	vec2 c = vec2(-0.32 + 0.16 * sin(time * 0.93), 0.49 + 0.08 * cos(time * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.05);
	vec3 col = vec3(0.71, 0.35, 0.58) * (0.25 / (abs(v * 2.61) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
