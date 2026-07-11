uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec2 z = p;
	vec2 c = vec2(-0.17 + 0.15 * sin(time * 1.22), 0.00 + 0.06 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, 0.42)));
	}
	float v = exp(-trap * 5.95);
	vec3 col = vec3(0.89, 0.46, 0.77) * (0.08 / (abs(v * 1.65) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
