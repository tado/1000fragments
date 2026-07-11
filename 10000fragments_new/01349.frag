uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	vec2 z = p;
	vec2 c = vec2(0.25 + 0.24 * sin(time * 0.52), -0.41 + 0.27 * cos(time * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.82);
	vec3 col = vec3(0.71, 0.78, 0.59) * (0.20 / (abs(v * 2.33) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
