uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.29 * sin(time * 1.17), 0.05 + 0.14 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.59);
	vec3 col = vec3(0.23, 0.42, 0.87) * (0.15 / (abs(v * 2.30) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
